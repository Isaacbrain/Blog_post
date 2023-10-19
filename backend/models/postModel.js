import sequelize from "../db/dbConfig.js";
import DataType from "sequelize";
import like from "./likeModel.js";
// import user from "./userModel.js";

const post = sequelize.define(
  "post",
  {
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
  },
  { paranoid: true }
);
post.hasMany(like, { foreignKey: "post_id" });
like.belongsTo(post, { foreignKey: "post_id" });

export default post;
