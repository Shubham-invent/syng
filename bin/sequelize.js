const { Sequelize } = require("sequelize");
require("dotenv").config();
const { SQL_DB_URL } = require("../constant");

const sequelize = new Sequelize(SQL_DB_URL);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("An error occurred while synchronizing the models:", error);
  });

module.exports = sequelize;
