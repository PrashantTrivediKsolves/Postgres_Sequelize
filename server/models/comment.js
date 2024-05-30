import { DataTypes } from "sequelize";

// import { blogModel } from "../models/blog.js";
import { newBlogModelFile } from "../models/blogsWithFile.js";
import { userModel } from "../models/user.js";

export const commentModel = async (sequelize) => {

    const comment = sequelize.define('comment', {
            id: {
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
            },
            comment: {
              type: DataTypes.STRING,
              allowNull: false
            }
          });

    // const blog = await blogModel(sequelize); 
    const blog = await newBlogModelFile(sequelize); 

    const user=await userModel(sequelize);
    blog.hasMany(comment,{ foreignKey: 'blogId' });

    comment.belongsTo(blog,{ foreignKey: 'blogId' }); // Each blog can have multiple comment.........

    // also user can have multiple comments.....
    
    // one user can do multiple comment on the perticular post...

    user.hasMany(comment,{ foreignKey: 'userId' });

    comment.belongsTo(user,{ foreignKey: 'userId' });

    return comment;
};