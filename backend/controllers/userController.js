import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import postModel from "../models/postModel.js";
import likeModel from "../models/likeModel.js";
import createToken from "../middleware/authUser.js";

const registerUser = async (req, res) => {
  try {
    const addUser = req.body;
    const password = addUser.password;
    const hashPassword = await bcrypt.hash(password, 10);
    addUser.password = hashPassword;
    const email = addUser.email;
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }
    const newUser = await userModel.create(addUser);
    // token
    // const token = createToken(newUser.id);
    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    if (newUser) {
      return res.status(201).json({ message: "Succesful", user: newUser.id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to create" });
  }
};

//user login
const loginUser = async (req, res, next) => {
  const token = req.token;
  const userDetails = req.body;
  // if (userDetails) {
  //   res.status(200).json({ message: "login successful", token });
  // }
  next();
};

//get a user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(409).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "successful", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//get all users
const getAllusers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      include: [
        {
          model: postModel,
          include: [{ model: likeModel }],
        },
      ],
    });
    if (!users) {
      return res.status(409).json({ message: "user not found" });
    }
    return res
      .status(200)
      .json({ message: "Successful", data: users.length, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//update users
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  try {
    const updating = await userModel.findByPk(id);
    if (!updating) {
      return res.status(409).json({ massage: "User not found" });
    }
    const updatedUser = await userModel.update(updateInfo, { where: { id } });
    return res
      .status(200)
      .json({ message: " User updates successfully", updateInfo });
  } catch (error) {
    console.log();
    return res.status(500).json({ message: "Server error", error });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(409).json({ message: "user not found" });
    }
    const deletedTrainee = await userModel.destroy({ where: { id } });

    return res.status(200).json({ message: "user deleted successful" });
  } catch (error) {
    return res.status(500).json({ message: "server not found" });
  }
};

export default {
  registerUser,
  getUser,
  getAllusers,
  updateUser,
  deleteUser,
  loginUser,
};
