import { Sequelize } from "sequelize";

import { UserFollowModel } from "../models/Follow.js";

const sequelize = new Sequelize('newBlogDemo', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  
  let newUserFollowModel=null;
  const connectionUserFollow=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newUserFollowModel=await UserFollowModel(sequelize);
        await sequelize.sync();
        console.log("Database created UserFollowModel");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  
  export {
    connectionUserFollow,
    newUserFollowModel,
  }

