import sequelize from "../db/dbConfig.js";
import Datatypes from "sequelize";

const like = sequelize.define(
  "likes",
  {
    id: {
      type: Datatypes.UUID,
      defaultValue: Datatypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    post_id: {
      type: Datatypes.UUID,
      References: {
        model: "posts",
        key: "id",
      },
    },
    user_id: {
      type: Datatypes.UUID,
      References: {
        model: "users",
        key: "id",
      },
    },
  },
  { paranoid: true }
);

export default like;
