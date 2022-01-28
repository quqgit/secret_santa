import { Request, Response } from "express";

import { SecretSantaInstance } from "../../models/secret_santa";
import Player from "../../../interfaces/player";
import { v4 as uuidv4 } from "uuid";

class SecretSantaController {
    async create (obj: Player) {
        try {
            const id = uuidv4()
            await SecretSantaInstance.create({id: id, receiver: obj});
            console.log({id: id, receiver: obj})
        } catch (e) {
            console.log(e)
        }

    }

    async getById (req: Request, res: Response) {
        try {
            const {id} = req.params;
            const record = await SecretSantaInstance.findOne({where: {id}});
            return res.json(record);
        } catch (e) {
            return res.json({msg: "fail to read", status: 500, route: "/find/:id"});
        }
    }
}

export default new SecretSantaController()
