import sequelize from "../db/dbConfig.js";
import DataType from "sequelize";

const post = sequelize.define("post", {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
  slug: {
    type: DataType.STRING,
    // allowNull: false,
  },
  user_id: {
    type: DataType.UUID,
    Reference: {
      model: "user",
      key: "id",
    },
  },
});

export default post;
