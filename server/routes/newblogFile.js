// routes/newblogFile.js
import express from 'express';

import multer from 'multer';

import { newblogModelFile } from '../postgres/blogsWithFile.js'; // Adjusted import...


import protectRoute from '../middlewares/protectRoute.js';

const routerBlogFile = express.Router();

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

routerBlogFile.post('/upload', upload.single('file'),async (req, res) => {
    try {
        const { title, content ,userId} = req.body;
        console.log("I am in upload post route");
        console.log(title);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { originalname, path } = req.file;
        console.log(req.file);

        // Create a new record in the 'files' table using Sequelize
        // console.log(req.user);
        const newFile = await newblogModelFile.create({ title, content, name: originalname, path,userId});
        res.json(newFile);
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ message: 'File upload failed' });
    }
});
routerBlogFile.get('/getAllTheBlogsOfThatUser/:userId',async(req,res)=>{
    try{
        const {userId}=req.params;
        console.log(userId);
        const userBlogs = await newblogModelFile.findAll({ where: { userId } });
        res.json(userBlogs);

    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
routerBlogFile.get('/uploads', async (req, res) => {
    try {
        const files = await newblogModelFile.findAll({});
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Failed to fetch files' });
    }
});



export default routerBlogFile;
