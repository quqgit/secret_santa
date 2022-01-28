import express, { Request, Response } from 'express';
import Validator from '../validator'
import Middleware from '../../middleware';
import PlayerController from '../controller/player_controller'
import SecretSantaController from "../controller/santa_controller";
import Player from "../../interfaces/player";
import { SecretSantaInstance } from "../models/secret_santa";
import { PlayerInstance } from "../models/player";

const router = express.Router();

router.post(
    '/register',
    Validator.validateRegisterPlayer(),
    Middleware.handleValidationError,
    PlayerController.create
)

router.post(
    '/shuffle',
    async (_: Request, res: Response) => {
        function shuffleArray (array: Array<Player>) {
            let currentIndex = array.length, randomIndex

            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
            }

            return array
        }

        try {
            let players: Array<Player> = new Array<Player>()

            await PlayerController.getAll().then(data => {
                if (data) {
                    for (const datum of data) {
                        const playerDB = datum.get();
                        const player: Player = {
                            name: playerDB.name,
                            lastName: playerDB.lastName,
                            wishes: playerDB.wishes,

                        }
                        players.push(player)
                    }
                }
            })

            if (players.length < 3) {
                throw new Error(`You need at lest 3 players, add ${3 - players.length} more`)
            }

            if (players.length > 500) {
                throw new Error(`Maximum possible number of players 500`)
            }

            const shuffledPairs = shuffleArray(players)

            const matches = shuffledPairs.map((name, index) => {
                return {
                    santa: name,
                    receiver: shuffledPairs[index + 1] || shuffledPairs[0],
                }
            });

            for (const obj of matches) {
                await SecretSantaController.create(obj.receiver);
            }

            await PlayerInstance.destroy({
                where: {},
                truncate: true
            })

            res.status(200).json(await SecretSantaInstance.findAll({}))
        } catch (e) {
            res.status(501).send(e.message)
        }
    }
)

router.get(
    '/find/:id',
    Validator.validateIdParam(),
    Middleware.handleValidationError,
    SecretSantaController.getById
)

export default router
