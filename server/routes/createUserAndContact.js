// Assuming you have an Express app and Sequelize instance set up

import express from 'express';

const router = express.Router();

// Import your Sequelize instance........

import { newuserModel } from '../postgres/user.js';

import { newContactModel } from '../postgres/contactInfo.js';

import { newblogModel } from '../postgres/blog.js';

import { where } from 'sequelize';
// Create a new user and associuated contact......................

router.post('/createUserAndContact', async(req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        const newUser = await newuserModel.create({ username, email, password });
        console.log(newUser.id);
        const newContact = await newContactModel.create({ phone, userId: newUser.id });
        res.status(201).json({ user: newUser, contact: newContact });
    } catch (error) {
        console.error('Error creating user and contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define routes for creating a blog post
router.post('/createBlog', async (req, res) => {
    try {
        const { username, email, password, title, content } = req.body;
        // Create or find the user
        let user = await newuserModel.findOne({ where: { username } });
        if (!user) {
            user = await newuserModel.create({ username, email, password });
        }
        // Create a blog post associated with the user....

        const blogPost = await newblogModel.create({
            title,
            content,
            userId: user.id
        });

        res.status(201).json(blogPost);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/getblogsOfUser/:username',async(req,res)=>
{
    //http://localhost:8001/getblogsOfUser/prashant trivedi

    try{
        const username = req.params.username;
        const user =await newuserModel.findOne({where:{username}});
        if (!user) {
            res.status(404).json({user:"User not found"});
        }
        const userId = user.id;
        const userBlogs = await newblogModel.findAll({ where: { userId } });
        res.json(userBlogs);
    }
    catch (error) {
        console.error('Error :getting blogs ', error);
        res.status(500).json({ error: 'Internal server error' });

    }
})


// many to many relationship.....

// route for actors......
router.post('/actors', async (req, res) => {
    try {
        const { name } = req.body;

        // Create a new actor
        const newActor = await Actor.create({ name });

        res.status(201).json(newActor);
    } catch (error) {
        console.error('Error creating actor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// route for movies......

router.post('/movies', async (req, res) => {
    try {
        const { title, releaseYear } = req.body;

        // Create a new movie
        const newMovie = await Movie.create({ title, releaseYear });

        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ActorMovie Assosiations...

// Route to associate an actor with a movie

router.post('/actors/:actorId/movies/:movieId', async (req, res) => {
    try {
        const { actorId, movieId } = req.params;

        // Create a new entry in ActorMovie to associate the actor with the movie
        await ActorMovie.create({ actorId, movieId });

        res.status(201).json({ message: 'Actor associated with movie successfully' });
    } catch (error) {
        console.error('Error associating actor with movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;



