// models/blogsWithFile.js
import { DataTypes } from "sequelize";
import { userModel } from "./user.js";

export const newBlogModelFile = async (sequelize) => {
    const blogFile = sequelize.define('file', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    const User = await userModel(sequelize);
    User.hasMany(blogFile);
    blogFile.belongsTo(User); // Each blog belongs to one user
    
    return blogFile; // Return the actual model instance

};
