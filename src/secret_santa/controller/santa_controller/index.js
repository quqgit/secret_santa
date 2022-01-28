"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secret_santa_1 = require("../../models/secret_santa");
const uuid_1 = require("uuid");
class SecretSantaController {
    async create(obj) {
        try {
            const id = uuid_1.v4();
            await secret_santa_1.SecretSantaInstance.create({ id: id, receiver: obj });
            console.log({ id: id, receiver: obj });
        }
        catch (e) {
            console.log(e);
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const record = await secret_santa_1.SecretSantaInstance.findOne({ where: { id } });
            return res.json(record);
        }
        catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/find/:id" });
        }
    }
}
exports.default = new SecretSantaController();
//# sourceMappingURL=index.js.map