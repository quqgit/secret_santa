"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../../../config/database.config"));
class PlayerInstance extends sequelize_1.Model {
}
exports.PlayerInstance = PlayerInstance;
PlayerInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    wishes: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'players',
});
exports.default = new PlayerInstance();
//# sourceMappingURL=index.js.map