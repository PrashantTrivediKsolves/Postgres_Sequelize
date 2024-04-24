import  express from 'express';

import jwt from 'jsonwebtoken';

const routeruser = express.Router();

const JWT_SECRET = 'your-secret-key';

import bcrypt from 'bcrypt';

import {newuserModel} from '../postgres/user.js';

routeruser.post('/signup', async (req, res) => {
    try {
      const { username, email,password} = req.body;
      const newUser = await newuserModel.create({ username, email,password});
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
            { id: user.id, email: user.email},
            JWT_SECRET, 
            { expiresIn: '1h' } 
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