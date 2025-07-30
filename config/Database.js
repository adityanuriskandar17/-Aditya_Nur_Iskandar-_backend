import { Sequelize } from "sequelize";

const db = new Sequelize('meeting_booking_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db; 