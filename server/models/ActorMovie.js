import { DataTypes } from "sequelize";

import { ActorModel } from "./Actor.js";

import { MovieModel } from "./Movie.js";

export const ActorMovieModel = async (sequelize) => {
    const ActorMovie = sequelize.define('actor_movie', {
        actorId: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        movieId: {
            type: DataTypes.UUID,
            primaryKey: true
        }
    });
    const Actor=await ActorModel(sequelize);
    const Movie=await MovieModel(sequelize);
    Actor.belongsToMany(Movie, { through: ActorMovie, foreignKey: 'actorId' });
    Movie.belongsToMany(Actor, { through: ActorMovie, foreignKey: 'movieId' });
    return ActorMovie;
};