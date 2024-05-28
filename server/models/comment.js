import { DataTypes } from "sequelize";

import { blogModel } from "../models/blog.js";
import { userModel } from "../models/user.js";

export const commentModel = async (sequelize) => {

    const comment = sequelize.define('comment', {

        id: {
            type: DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    const blog = await blogModel(sequelize); 

    const user=await userModel(sequelize);

    blog.hasMany(comment);

    comment.belongsTo(blog); // Each blog can have multiple comment.........

    // also user can have multiple comments.....
    
    // one user can do multiple comment on the perticular post...

    user.hasMany(comment);

    comment.belongsTo(user);
    
    return comment;
};