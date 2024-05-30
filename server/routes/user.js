import  express from 'express';

import jwt from 'jsonwebtoken';

const routeruser = express.Router();

const JWT_SECRET = 'your-secret-key';

import bcrypt from 'bcrypt';

import {newuserModel} from '../postgres/user.js';

import { where } from 'sequelize';
import multer from 'multer';
const storage = multer.diskStorage({
    
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

routeruser.post('/signup',upload.single('file'), async (req, res) => {

    try {
      const { username, email,password} = req.body;
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, path } = req.file;

    console.log(req.file);

      const newUser = await newuserModel.create({ username, email,password,name:originalname,path});
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  routeruser.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await newuserModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email,username:user.username},
            JWT_SECRET, 
            // { expiresIn: '1h' } 
        );
        res.cookie('token', token, {
          httpOnly: true, 
          secure: true,   
          sameSite: 'none' 
      });
        res.status(200).json({
            message: 'Login successful',
            token,
            email:user.email,
            username:user.username,
            role:user.role,
            id:user.id,
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// routeruser.get("/:userId",async(req,res)=>
// {
//   const { userId } = req.params;

//   try {
//     // Query the database to find the user by userId
//     const user = await newuserModel.findOne({where:{id:userId}});

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     // Return the user data as JSON response..........

//     res.status(200).json(user);

//   } catch (err) {
//     console.error('Error fetching user:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }

// });


routeruser.get("/all-users",async(req,res)=>
{
  const All_users = await newuserModel.findAll({});
  res.json(All_users);
})


routeruser.get('/logout', (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default routeruser;