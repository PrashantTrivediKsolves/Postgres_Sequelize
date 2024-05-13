import { DataTypes } from "sequelize";

import { userModel } from "./user.js";

export const UserFollowModel = async (sequelize) => {
    const userFollow = sequelize.define('Follow', {
        userIdkey: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        FollowId: {
            type: DataTypes.UUID,
            primaryKey: true
        }   
    });
    const User=await userModel(sequelize);
    User.belongsToMany(User,{as:"User",foreignKey:"userIdkey",through:"Follow"});
    User.belongsToMany(User,{as:"Followed",foreignKey:"FollowId",through:"Follow"});
    return userFollow;
};


































//https://chat.openai.com/c/7fe30985-9cfe-4d82-b4bf-caa75d28534d