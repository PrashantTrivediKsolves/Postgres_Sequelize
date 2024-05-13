import { DataTypes } from "sequelize";

import { blogModel } from "./blog.js";

export const LikeModel = async (sequelize) => {

    const Like = sequelize.define('Like',
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      liked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // true for like, false for dislike
      }});
    // has many relationship bitween the blog and like model...........
    // const Blog = await blogModel(sequelize);
    // Blog.hasMany(Like);
    // Like.belongsTo(Blog); 
    return Like;
};