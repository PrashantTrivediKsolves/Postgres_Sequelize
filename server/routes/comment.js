import express from "express";

const routercomment = express.Router();

import { newcommentModel } from "../postgres/comment.js";
import protectRoute from '../middlewares/protectRoute.js';

routercomment.post('/comment',protectRoute,async (req, res) => {
  try {
    const { comment, postId} = req.body;
    const newComment = await newcommentModel.create({ comment, blogId:postId, userId: req.user.id });
    res.status(201).json(newComment);

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

// it will give the logged user blogs..........

routercomment.get('/getAllCommentOnPost/:postId',async(req,res)=>{
    try{
        const {postId}=req.params;
        const userComments = await newcommentModel.findAll({ where: { blogId:postId} });
        res.json(userComments);
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
// comments on the perticular logged user
routercomment.get('/getAllCommentOnPost/:postId/:userId',async(req,res)=>{
    try{
        const {postId,userId}=req.params;
        const userComments = await newcommentModel.findAll({ where: { blogId:postId,userId:userId} });
        res.json(userComments);
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})




export default routercomment;
