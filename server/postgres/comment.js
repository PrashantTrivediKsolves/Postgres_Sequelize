import { Sequelize } from "sequelize";

import { commentModel } from "../models/comment.js";
const sequelize = new Sequelize('newBlogDemo', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newcommentModel=null;
  const connectioncomment=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newcommentModel=await commentModel(sequelize);
        await sequelize.sync();
        console.log("Database created comment");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectioncomment,
    newcommentModel,
  }