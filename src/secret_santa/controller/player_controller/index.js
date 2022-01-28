"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../../models/player");
const uuid_1 = require("uuid");
const secret_santa_1 = require("../../models/secret_santa");
class PlayerController {
    async create(req, res) {
        try {
            await secret_santa_1.SecretSantaInstance.destroy({
                where: {},
                truncate: true
            });
            const id = uuid_1.v4();
            const record = await player_1.PlayerInstance.create({ ...req.body, id });
            return res.json({ record, msg: "Successfully create new player" });
        }
        catch (e) {
            return res.json({ msg: "fail to create", status: 500, route: "/create" });
        }
    }
    async getAll() {
        try {
            return await player_1.PlayerInstance.findAll({});
        }
        catch (e) {
            console.log(e.message);
        }
    }
}
exports.default = new PlayerController();
//# sourceMappingURL=index.js.map