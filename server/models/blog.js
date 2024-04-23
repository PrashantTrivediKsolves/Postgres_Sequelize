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
    
    // Define association with user model (belongsTo relationship)
    const User = await userModel(sequelize); // Get the User 
    User.hasMany(Blog);
    Blog.belongsTo(User); // Each blog belongs to one user

    return Blog;
};