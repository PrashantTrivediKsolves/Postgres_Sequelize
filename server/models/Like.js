import { DataTypes } from 'sequelize';
import { newBlogModelFile } from '../models/blogsWithFile.js';

export const LikeModel = async(sequelize) =>{
  const Like = sequelize.define('Like', {
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
    }
  });

  // Associations


  return Like;
};