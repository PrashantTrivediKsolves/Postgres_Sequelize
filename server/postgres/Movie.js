import { Sequelize } from "sequelize";

import {MovieModel} from "../models/Movie.js";

const sequelize = new Sequelize('newBlogDemo', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newMovieModel=null;
  const connectionMovie=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newMovieModel=await MovieModel(sequelize);
        await sequelize.sync();
        console.log("Database created Movie");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionMovie,
    newMovieModel,
  }