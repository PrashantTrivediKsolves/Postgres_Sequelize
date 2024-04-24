import { Sequelize } from "sequelize";

import {blogModel} from "../models/blog.js";
const sequelize = new Sequelize('Association', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newblogModel=null;
  const connectionblog=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newblogModel=await blogModel(sequelize);
        await sequelize.sync();
        console.log("Database created blog");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      
  }
  export {
    connectionblog,
    newblogModel,
  }