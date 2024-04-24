//import express from "express";

const routerblog = express.Router();

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


export default routerblog;
