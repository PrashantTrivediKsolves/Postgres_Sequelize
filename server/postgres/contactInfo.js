import { Sequelize } from "sequelize";

import {contactModel} from "../models/contactInfo.js";

const sequelize = new Sequelize('newBlogDemo', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newContactModel=null;
  const connectionContact=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newContactModel=await contactModel(sequelize);
        await sequelize.sync();
        console.log("Database created blog");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionContact,
    newContactModel,
  }