import Sequelize from "sequelize";

const sequelize = new Sequelize("Blog_post_db", "root", "", {
  host: "localhost",
  port: "4306",
  dialect: "mysql",
  // logging: false,
});

export default sequelize;
