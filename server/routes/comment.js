import express from "express";

const routercomment = express.Router();

import { newcommentModel } from "../postgres/comment.js";

import protectRoute from '../middlewares/protectRoute.js';
import { where } from "sequelize";
import { newblogModelFile } from "../postgres/blogsWithFile.js";

// routercomment.post('/comment',async (req, res) => {
  
//   try {
//     const { comment, postId,userId} = req.body;
//     const blog = await newblogModelFile.findOne({where:{id:postId}});
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }

//     const newComment = await newcommentModel.create({ comment,blogId:postId,userId:userId});

//     res.status(201).json(newComment);

//   }
//   catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }   
// });
routercomment.post('/comment', async (req, res) => {
  try {
    console.log("I a inside the comment");
    if (!newcommentModel) {
      return res.status(500).json({ error: 'Comment model is not initialized' });
    }

    console.log("newcommentModel:", newcommentModel); // Debugging log
    const { comment, postId, userId } = req.body;
    const blog = await newblogModelFile.findOne({ where: { id: postId } });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const newComment = await newcommentModel.create({ comment, blogId: postId, userId });

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

// comments on the perticular logged user on perticular post......
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
routercomment.get('/getAllcomment/:userId',async(req,res)=>
{
  try{
    const {userId}=req.params;
    const AllCommentsOfPerticularUser=await newcommentModel.findAll({where:{userId:userId}});
    res.json(AllCommentsOfPerticularUser);
  }
  catch(error)
  {
    console.log('Error logging in:',error);
    res.status(500).json({error:'Internal Server Error'});
  }
})

export default routercomment;
