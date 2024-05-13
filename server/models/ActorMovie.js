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


































//https://chat.openai.com/c/7fe30985-9cfe-4d82-b4bf-caa75d28534d