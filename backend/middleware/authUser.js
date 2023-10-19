import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const userInfo = async (req, res, next) => {
  try {
    const jwtSecret = process.env.TOKEN_SECRET;
    const tokenDuration = process.env.TOKEN_DURATION;
    const loginInfo = req.body;
    const email = loginInfo.email;
    const findUser = await userModel.findOne({ where: { email } });
    if (!findUser) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(
      loginInfo.password,
      findUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const tokenVariables = {
      email: loginInfo.email,
      username: loginInfo.username,
    };
    const userToken = jwt.sign(tokenVariables, jwtSecret, {
      expiresIn: tokenDuration,
    });
    req.token = userToken;
    req.user = findUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to login" });
  }
};

export default userInfo;

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return Jwt.sign({ id }, "i am the aquaman ", {
//     expiresIn: maxAge,
//   });
// };
// export default createToken;
