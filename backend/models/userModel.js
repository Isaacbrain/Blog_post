import sequelize from "../db/dbConfig.js";
import DataTypes from "sequelize";
import post from "./postModel.js";
import like from "./likeModel.js";

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);
user.hasMany(post, { foreignKey: "user_id" });
post.belongsTo(user, { foreignKey: "user_id" });
user.hasMany(like, { foreign: "user_id" });
like.belongsTo(user, { foreignKey: "user_id" });

export default user;
