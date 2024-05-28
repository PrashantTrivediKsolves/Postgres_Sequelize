// postgres/blogsWithFile.js
import { Sequelize } from "sequelize";
import { newBlogModelFile } from "../models/blogsWithFile.js";

const sequelize = new Sequelize('Association', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'
});

let newblogModelFile = null;

const connectionNewBlogFile = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        newblogModelFile = await newBlogModelFile(sequelize);
        await sequelize.sync();
        console.log("Database synchronized with new blog file model");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export {
    connectionNewBlogFile,
    newblogModelFile,
};
