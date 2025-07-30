import { Sequelize } from "sequelize";

const db = new Sequelize('new_meet', 'root', 'IniPasswordBaru123!',{
    host:'localhost',
    dialect:'mysql'
});

export default db;