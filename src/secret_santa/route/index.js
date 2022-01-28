"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../validator"));
const middleware_1 = __importDefault(require("../../middleware"));
const player_controller_1 = __importDefault(require("../controller/player_controller"));
const santa_controller_1 = __importDefault(require("../controller/santa_controller"));
const secret_santa_1 = require("../models/secret_santa");
const player_1 = require("../models/player");
const router = express_1.default.Router();
router.post('/register', validator_1.default.validateRegisterPlayer(), middleware_1.default.handleValidationError, player_controller_1.default.create);
router.post('/shuffle', async (_, res) => {
    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    try {
        let players = new Array();
        await player_controller_1.default.getAll().then(data => {
            if (data) {
                for (const datum of data) {
                    const playerDB = datum.get();
                    const player = {
                        name: playerDB.name,
                        lastName: playerDB.lastName,
                        wishes: playerDB.wishes,
                    };
                    players.push(player);
                }
            }
        });
        if (players.length < 3) {
            throw new Error(`You need at lest 3 players, add ${3 - players.length} more`);
        }
        if (players.length > 500) {
            throw new Error(`Maximum possible number of players 500`);
        }
        const shuffledPairs = shuffleArray(players);
        const matches = shuffledPairs.map((name, index) => {
            return {
                santa: name,
                receiver: shuffledPairs[index + 1] || shuffledPairs[0],
            };
        });
        for (const obj of matches) {
            await santa_controller_1.default.create(obj.receiver);
        }
        await player_1.PlayerInstance.destroy({
            where: {},
            truncate: true
        });
        res.status(200).json(await secret_santa_1.SecretSantaInstance.findAll({}));
    }
    catch (e) {
        res.status(501).send(e.message);
    }
});
router.get('/find/:id', validator_1.default.validateIdParam(), middleware_1.default.handleValidationError, santa_controller_1.default.getById);
exports.default = router;
//# sourceMappingURL=index.js.map