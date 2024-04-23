import { DataTypes } from "sequelize";

export const MovieModel = async (sequelize) => {
    const Movie = sequelize.define('movie', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        releaseYear: {
            type: DataTypes.INTEGER
        }
    });
    return Movie;
};