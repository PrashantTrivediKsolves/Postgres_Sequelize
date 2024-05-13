import { Sequelize } from "sequelize";

import { LikeModel } from "../models/Like.js";

const sequelize = new Sequelize('Association', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newLikeModel=null;
  const connectionlike=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newLikeModel=await LikeModel(sequelize);
        await sequelize.sync();
        console.log("Database created Like");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionlike,
    newLikeModel,
  }