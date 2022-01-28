import { Request, Response } from "express";

import { PlayerInstance } from "../../models/player";
import { v4 as uuidv4 } from "uuid";
import { SecretSantaInstance } from "../../models/secret_santa";

class PlayerController {
    async create (req: Request, res: Response) {
        try {
            await SecretSantaInstance.destroy({
                where: {},
                truncate: true
            })
            const id = uuidv4()

            const record = await PlayerInstance.create({...req.body, id});
            return res.json({record, msg: "Successfully create new player"});
        } catch (e) {
            return res.json({msg: "fail to create", status: 500, route: "/create"});
        }
    }

    async getAll () {
        try {
            return await PlayerInstance.findAll({})
        } catch (e) {
            console.log(e.message);
        }
    }
}

export default new

PlayerController()
