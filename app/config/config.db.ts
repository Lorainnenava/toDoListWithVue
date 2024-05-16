const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const connection = new Sequelize({
  host: process.env.DBHOST,
  dialect: "mysql",
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBASE,
});

module.exports = connection;
