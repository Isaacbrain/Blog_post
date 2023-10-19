import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import likeModel from "../models/likeModel.js";

//slug function

// create a post
const registerPost = async (req, res) => {
  try {
    const Title = req.body.title;
    const addPost = req.body;
    addPost.slug = Title.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    //check for existing post
    const content = addPost.content;
    const existingPost = await postModel.findOne({ where: { content } });
    if (existingPost) {
      return res.status(409).json({ message: "Post already exist" });
    }
    const newPost = await postModel.create(addPost);
    if (newPost) {
      return res.status(201).json({ message: "Successful", newPost });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to create", error });
  }
};

// get a post
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findOne({ id, include: userModel });
    if (!post) {
      return res.status(409).json({ message: "Post not found" });
    }
    if (post) {
      return res.status(200).json({ message: "succesful", post });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", error });
  }
};

// get all post
const getAllPost = async (req, res) => {
  try {
    const userId = req.params.user_id;
    console.log("user_id", userId);
    const allPost = await postModel.findAll({
      include: [
        {
          model: likeModel,
          include: [{ model: userModel }],
        },
      ],
    });
    if (!allPost) {
      return res.status(409).json({ message: "there's noPostn" });
    }
    if (allPost)
      return res.status(200).json({
        message: "Successful",
        token: req.token,
        data: allPost.length,
        allPost,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

//update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  try {
    if (!id) {
      return res.status(409).json({ massage: "Post not found" });
    }
    const updatedPost = await postModel.update(updateInfo, { where: { id } });
    return res
      .status(200)
      .json({ message: "updated Successfully", updatedPost });
  } catch (error) {
    console.log();
    return res.status(500).json({ message: "Server error" });
  }
};

//delete Post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(409).json({ message: "Post not found" });
    }
    const deletePostn = await postModel.destroy({ where: { id } }); // this is hard delete

    return res.status(200).json({ message: "Post deleted successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default {
  registerPost,
  getPost,
  getAllPost,
  updatePost,
  deletePost,
};
