import { BelongsTo, DataTypes, ENUM } from "sequelize";
import bcrypt from 'bcrypt';
export const userModel = async (sequelize) => {
    const User = sequelize.define('user', {
        
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },

        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        password: {
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
    
    User.beforeCreate(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    });

    // many-to-many => belongsToMany;
    // User.belongsToMany(User,{as:"User",foreignKey:"userIdkey",through:"Follow"});
    // User.belongsToMany(User,{as:"Followed",foreignKey:"FollowId",through:"Follow"});

    return User;

}

