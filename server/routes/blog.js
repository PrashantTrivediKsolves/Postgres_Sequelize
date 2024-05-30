//import express from "express";

// import { newblogModel } from "../postgres/blog.js";
// import protectRoute from "../middlewares/protectRoute.js";
// routerblog.post("/createBlog/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content } = req.body;
//     const blogPost = await newblogModel.create({
//       title,
//       content,
//       userId: id,
//     });
//     res.status(201).json(blogPost);
//   } catch (error) {
//     console.error("Error creating blog post:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// middlewares 

// routerblog.post("/createBlog/:id",protectRoute, async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { title, content } = req.body;
//       const blogPost = await newblogModel.create({
//         title,
//         content,
//         userId: id,
//       });
//       res.status(201).json(blogPost);
//     } catch (error) {
//       console.error("Error creating blog post:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });

// export default routerblog;


import express from 'express';
const routerblog = express.Router();;

import protectRoute from '../middlewares/protectRoute.js';

import { newblogModel } from "../postgres/blog.js";


routerblog.post('/create-blog-post', protectRoute, async (req, res) => {
  
  try {

    const { title, content } = req.body;
    
    const newPost = await newblogModel.create({ title, content, userId: req.user.id });
    res.status(201).json(newPost);

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

// it will give the logged user blogs.....................

routerblog.get('/getAllTheBlogsOfThatUser',protectRoute,async(req,res)=>{
    try{
        const userId=req.user.id;
        console.log(userId);
        const userBlogs = await newblogModel.findAll({ where: { userId } });
        res.json(userBlogs);

    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//it will give the all blogs of the table......

routerblog.get('/All_blogs',async(req,res)=>{
  
  try{
      const All_Blogs = await newblogModel.findAll({});
      res.json(All_Blogs);
  }
  catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

export default routerblog;
