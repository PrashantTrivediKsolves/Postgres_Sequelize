import { DataTypes } from "sequelize";

export const MovieModel = async (sequelize) => {
    const Movie = sequelize.define('movie', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // movieId: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
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