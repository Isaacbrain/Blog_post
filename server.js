import express from "express";
import sequelize from "./db/dbConfig.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(bodyParser.json());
const port = 3000;
app.use("/user", userRouter);

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
