import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database.config';
import Player from "../../../interfaces/player";

interface PlayerDB extends Player {
    id: string
}


export class PlayerInstance extends Model<PlayerDB> {
}

PlayerInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wishes: {
        type: DataTypes.JSON,
        allowNull: false,
    }
}, {
    sequelize: db,
    tableName: 'players',
})

export default new PlayerInstance()
