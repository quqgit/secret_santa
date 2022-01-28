"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretSantaInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../../../config/database.config"));
class SecretSantaInstance extends sequelize_1.Model {
}
exports.SecretSantaInstance = SecretSantaInstance;
SecretSantaInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    receiver: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: false,
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'santas',
});
//# sourceMappingURL=index.js.map