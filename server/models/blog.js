import { DataTypes } from "sequelize";

import { userModel } from "./user.js";

export const blogModel = async (sequelize) => {

    const Blog = sequelize.define('blog', {
        id: {
            type: DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    const User = await userModel(sequelize); 
    User.hasMany(Blog);
    Blog.belongsTo(User); // Each blog belongs to one user

    return Blog;
};