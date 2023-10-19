import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./db/dbConfig.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import likeRouter from "./routes/likeRouter.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT;

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);

// const user = { name: username };
// JsonWebTokenError.sign(user, process.env.ACCESS_TOKEN_SECRET);

try {
  await sequelize.authenticate();
  console.log("Connection Successful");
  app.listen(port, () => {
    console.log(`App is listening @ ${port}`);
  });
} catch (error) {
  console.error("Unable to connect to db", error);
}
(async () => {
  await sequelize.sync();
})();
