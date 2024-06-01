
import express from "express";
const routerlike = express.Router();
import { newLikeModel } from "../postgres/Like.js";

// Toggle like route
routerlike.post('/Like', async (req, res) => {
  const { userId, postId } = req.body;

  // Check if the user already liked this post
  const existingLike = await newLikeModel.findOne({ where: { userId: userId, postId: postId } });
  if (existingLike) {
    // If already liked, remove the like (toggle off)
    if (existingLike.liked) {
      await newLikeModel.destroy({ where: { userId: userId, postId: postId } });
      return res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      // If it was disliked, update it to liked
      await newLikeModel.update({ liked: true }, { where: { userId: userId, postId: postId } });
      return res.status(200).json({ message: 'Post liked successfully' });
    }
  } else {
    // If not liked or disliked before, create a new like record
    await newLikeModel.create({ userId, postId, liked: true });
    return res.status(200).json({ message: 'Post liked successfully' });
  }
});

// Toggle dislike route
routerlike.post('/Dislike', async (req, res) => {
  const { userId, postId } = req.body;

  // Check if the user already disliked this post
  const existingLike = await newLikeModel.findOne({ where: { userId: userId, postId: postId } });
  if (existingLike) {
    // If already disliked, remove the dislike (toggle off)
    if (!existingLike.liked) {
      await newLikeModel.destroy({ where: { userId: userId, postId: postId } });
      return res.status(200).json({ message: 'Post undisliked successfully' });
    } else {
      // If it was liked, update it to disliked
      await newLikeModel.update({ liked: false }, { where: { userId: userId, postId: postId } });
      return res.status(200).json({ message: 'Post disliked successfully' });
    }
  } else {
    // If not liked or disliked before, create a new dislike record
    await newLikeModel.create({ userId, postId, liked: false });
    return res.status(200).json({ message: 'Post disliked successfully' });
  }
});

routerlike.get("/likecount/:postId/:liked", async (req, res) => {
  const { liked, postId } = req.params;
  const user_Like_DisLike = await newLikeModel.findAll({ where: { liked, postId } });
  res.json(user_Like_DisLike);
});

export default routerlike;



 //export default routerlike;
