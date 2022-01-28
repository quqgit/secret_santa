import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database.config';
import Player from "../../../interfaces/player";

interface SecretSanta {
    id: string,
    receiver: Player
}

export class SecretSantaInstance extends Model<SecretSanta> {
}

SecretSantaInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    receiver: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: false,
    }
}, {
    sequelize: db,
    tableName: 'santas',
})
