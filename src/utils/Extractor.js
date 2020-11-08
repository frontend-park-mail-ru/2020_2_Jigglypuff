import MovieModel from '../models/MovieModel';

/** Class that contains methods to extract data from anything */
export default class Extractor {
    /**
     * Extract filled fields from Settings form.
     * @param {Map} data
     * @return {Map}
     */
    static extractFormData(data) {
        const result = new Map();

        result['login'] = data['state'].login;
        result['password'] = data['state'].password;
        result['name'] = data['state'].name;
        result['surname'] = data['state'].surname;
        result['avatar'] = data['state'].avatar;

        return result;
    }

    /**
     * Extract movie data from json to model.
     * @param {JSON} data
     * @return {MovieModel}
     */
    static extractMovieDataFromJSON(data) {
        const movieModel = new MovieModel();

        movieModel.ageGroup = data['AgeGroup'];
        movieModel.country = data['Country'];
        movieModel.description = data['Description'];
        movieModel.duration = data['Duration'];
        movieModel.genre = data['Genre'];
        movieModel.id = data['ID'];
        movieModel.name = data['Name'];
        movieModel.pathToAvatar = data['PathToAvatar'];
        movieModel.producer = data['Producer'];
        movieModel.rating = data['Rating'];
        movieModel.ratingCount = data['RatingCount'];
        movieModel.releaseYear = data['ReleaseYear'];

        return movieModel;
    }

    /**
     * Extract movie data from model to map.
     * @param {MovieModel} data
     * @return {Map}
     */
    static extractMovieDataFromModel(data) {
        const result = new Map();

        result.set('ageGroup', data.ageGroup);
        result.set('country', data.country);
        result.set('description', data.description);
        result.set('duration', data.duration);
        result.set('genre', data.genre);
        result.set('id', data.id);
        result.set('name', data.name);
        result.set('pathToAvatar', data.pathToAvatar);
        result.set('personalRating', data.personalRating);
        result.set('producer', data.producer);
        result.set('rating', data.rating);
        result.set('ratingCount', data.ratingCount);
        result.set('releaseYear', data.releaseYear);

        return result;
    }

    /**
     * Extract filled fields from cinemaData form.
     * @param {CinemaModel} data
     * @return {Map}
     */
    static extractCinemaData(data) {
        const result = new Map();

        result.set('address', data.address);
        result.set('authorID', data.authorID);
        result.set('hallCount', data.hallCount);
        result.set('id', data.id);
        result.set('name', data.name);

        return result;
    }

    /**
     * Extract schedule from json to map.
     * @param {JSON} data
     * @return {Map}
     */
    static extractScheduleFromJSON(data) {
        const result = new Map();

        result.set('cinemaID', data['CinemaID']);
        result.set('hallID', data['HallID']);
        result.set('id', data['ID']);
        result.set('movieID', data['MovieID']);
        result.set('premierTime', data['PremierTime']);

        return result;
    }
}
