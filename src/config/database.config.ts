import { Sequelize } from 'sequelize';

const db = new Sequelize('app', '', '', {
    storage: './secret_santa.sqlite',
    dialect: 'sqlite',
    logging: false,
});

export default db;
