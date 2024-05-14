import express from "express";

const routerfollow = express.Router();

import { newUserFollowModel } from "../postgres/Follow.js";

import { newuserModel } from "../postgres/user.js";
import { where } from "sequelize";

// POST /api/follow/:userId
routerfollow.post('/:userIdkey', async (req, res) => {
    const { userIdkey } = req.params;
    const { FollowId} = req.body;
    console.log(userIdkey);

    try {
    //   Check if the followerId is valid and exists
      const follower = await newuserModel.findOne({where:{
        id:FollowId
      }});
      if (!follower) {
        return res.status(404).json({ message: 'Follower not found' });
      }
  
      // Check if the userId is valid and exists..................
      const userToFollow = await newuserModel.findOne({where:{
        id:userIdkey
      }});
      if (!userToFollow) {
        return res.status(404).json({ message: 'User to follow not found' });
      }

    //   Check if the follower is already following the user..........

      const existingFollow = await newUserFollowModel.findOne({
        where: {
          userIdkey:userIdkey,
          FollowId:FollowId
        }
      });

      if (existingFollow) {
        return res.status(400).json({ message: 'User is already being followed' });
      }

      // Create a new follow relationship
      await newUserFollowModel.create({
        userIdkey: userIdkey,
        FollowId: FollowId
      });
      
      res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // POST /api/unfollow/:userId
  routerfollow.post('/:userIdkey', async (req, res) => {
    const { userIdkey } = req.params;
    const { FollowId} = req.body;
    console.log(userIdkey);

    try {
    //   Check if the followerId is valid and exists
      const follower = await newuserModel.findOne({where:{
        id:FollowId
      }});
      if (!follower) {
        return res.status(404).json({ message: 'Follower not found' });
      }
  
      // Check if the userId is valid and exists..................
      const userToFollow = await newuserModel.findOne({where:{
        id:userIdkey
      }});
      if (!userToFollow) {
        return res.status(404).json({ message: 'User to unfollow not found' });
      }
  
    //   Check if the follower is already following the user..........
      
      const existingFollow = await newUserFollowModel.findOne({
        where: {
          userIdkey:userIdkey,
          FollowId:FollowId
        }
      });

      if (!existingFollow) {
        return res.status(400).json({ message: 'User is not being followed' });
      }
      // Remove the follow relationship
    await existingFollow.destroy();

    res.status(200).json({ message: 'User unfollowed successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  
export default routerfollow;


//https://chatgpt.com/c/b9bba94d-bce8-489b-b439-3f433c9fddfa
