import { Sequelize } from "sequelize";

import {ActorModel} from "../models/Actor.js";

const sequelize = new Sequelize('Association', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newActorModel=null;
  const connectionActor=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newActorModel=await ActorModel(sequelize);
        await sequelize.sync();
        console.log("Database created Actor");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionActor,
    newActorModel,
  }