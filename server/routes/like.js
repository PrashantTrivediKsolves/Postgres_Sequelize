import express from "express";

const routerlike = express.Router();

import { newLikeModel } from "../postgres/Like.js";

routerlike.post('/Like',async (req, res) => {
const {userId,postId}=req.body;
  const existingLike = await newLikeModel.findOne({ where: { userId:userId, postId:postId ,liked:true} });
  if (existingLike) {
    return res.status(400).json({ message: 'User already liked this post' });
  }
  // Create a new like record..............................................................

  await newLikeModel.create({ userId, postId, liked: true });

  res.status(200).json({ message: 'Post liked successfully' });

  });

routerlike.post('/Dislike',async (req, res) => {

  const {userId,postId}=req.body;

  // Check if the user already disliked this post.............................................................
  const existingDislike = await newLikeModel.findOne({ where: { userId:userId, postId:postId ,liked:false} });
  if (existingDislike) {
    return res.status(400).json({ message: 'User already disliked this post' });
  }
  
  // Create a new dislike record..............................................................................
  await newLikeModel.create({ userId, postId, liked: false });
  res.status(200).json({ message: 'Post disliked successfully' });

});

routerlike.get("/likecount/:postId/:liked",async(req,res)=>
{
  const {liked,postId}=req.params;
  const user_Like_DisLike = await newLikeModel.findAll({ where: { liked,postId} });
  res.json(user_Like_DisLike);
});





export default routerlike;
