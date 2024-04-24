import { DataTypes } from "sequelize";
import { userModel } from "./user.js";
export const contactModel = async (sequelize) => {
    const Contact = sequelize.define('contact', {
        id: {
            type: DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName:true,
        timestamps:true,
    }
);
const User=await userModel(sequelize);
User.hasOne(Contact,{
    
});
Contact.belongsTo(User);
    return Contact;
};