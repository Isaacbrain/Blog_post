import likeModel from "../models/likeModel.js";

const createLike = async (req, res) => {
  try {
    const addLike = req.body;
    const like = await likeModel.create(addLike);
    if (like) {
      return res.status(200).json({ message: "you just liked a post" });
    }
  } catch (error) {
    return res.status(500).json({ message: "like unsuccessful", error });
  }
};

const getAllike = async (req, res) => {
  try {
    const like = await likeModel.findAll();
    return res
      .status(200)
      .json({ message: "successful", data: like.length, like });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "like error" });
  }
};

const deleteLike = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(409).json({ message: "like not found" });
    }
    const deletedLike = await likeModel.destroy({ where: { id } });
    return res.status(200).json({ message: "like deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Delete failed" });
  }
};

export default { createLike, getAllike, deleteLike };
