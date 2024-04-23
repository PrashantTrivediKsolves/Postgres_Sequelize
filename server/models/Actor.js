import { DataTypes } from "sequelize";

export const ActorModel = async (sequelize) => {
    const Actor = sequelize.define('actor', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Actor;
};