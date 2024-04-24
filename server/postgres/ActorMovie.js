import { Sequelize } from "sequelize";

import {ActorMovieModel} from "../models/ActorMovie.js";

const sequelize = new Sequelize('Association', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newActorMovieModel=null;
  const connectionActorMovie=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newActorMovieModel=await ActorMovieModel(sequelize);
        await sequelize.sync();
        console.log("Database created ActorMovie");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionActorMovie,
    newActorMovieModel,
  }
