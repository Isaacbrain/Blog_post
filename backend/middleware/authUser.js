import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.TOKEN_SECRET;

const userInfo = async (req, res, next) => {
  try {
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
      id: findUser.id,
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

//verfiy
const tokenVerification = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(404).json({ message: "no token existing" });
  }
  const verifying = jwt.verify(token, jwtSecret);
  req.userId = verifying.id;
  console.log("****************", verifying.id);
  next();
};

export default { userInfo, tokenVerification };

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return Jwt.sign({ id }, "i am the aquaman ", {
//     expiresIn: maxAge,
//   });
// };
// export default createToken;
