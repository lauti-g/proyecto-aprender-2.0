import 'dotenv/config' 
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    password: process.env.DB_password,
    username: process.env.DB_user,
    database: process.env.DB_database,
    host: process.env.DB_host,
    dialect: "mysql"
});

export default sequelize