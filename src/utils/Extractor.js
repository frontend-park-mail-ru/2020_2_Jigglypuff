import MovieModel from '../models/MovieModel';

/** Class that contains methods to extract data from anything */
export default class Extractor {
    /**
     * Extract filled fields from Settings form.
     * @param {Object} data
     * @return {Map}
     */
    static extractFormData(data) {
        const result = new Map();

        result.set('name', data.name);
        result.set('surname', data.surname);
        result.set('avatar', data.avatar);

        return result;
    }

    /**
     * Extract profile data from model to map.
     * @param {UserModel} data
     * @return {Map}
     */
    static extractProfileDataFromModel(data) {
        const result = new Map();

        result.set('login', data.login);
        result.set('name', data.name);
        result.set('surname', data.surname);
        result.set('pathToAvatar', data.pathToAvatar);

        return result;
    }

    /**
     * Extract movie data from json to model.
     * @param {JSON} data
     * @return {MovieModel}
     */
    static extractMovieDataFromJSON(data) {
        const movieModel = new MovieModel();

        movieModel.actors = data['Actors'];
        movieModel.ageGroup = data['AgeGroup'];
        movieModel.country = data['Country'];
        movieModel.description = data['Description'];
        movieModel.duration = data['Duration'];
        movieModel.genre = data['Genre'];
        movieModel.id = data['ID'];
        movieModel.name = data['Name'];
        movieModel.pathToAvatar = data['PathToAvatar'];
        movieModel.pathToSliderAvatar = data['PathToSliderAvatar'];
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

        result.set('actors', data.actors);
        result.set('ageGroup', data.ageGroup);
        result.set('country', data.country);
        result.set('description', data.description);
        result.set('duration', data.duration);
        result.set('genre', data.genre);
        result.set('id', data.id);
        result.set('name', data.name);
        result.set('pathToAvatar', data.pathToAvatar);
        result.set('pathToSliderAvatar', data.pathToSliderAvatar);
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
        result.set('pathToAvatar', data.pathToAvatar);

        return result;
    }

    /**
     * Extract filled fields from hallData form.
     * @param {HallModel} data
     * @return {Map}
     */
    static extractHallData(data) {
        const result = new Map();

        result.set('id', data.id);
        result.set('placeAmount', data.placeAmount);
        result.set('placeConfig', data.placeConfig);

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

    /**
     * Extract movie data from model to map.
     * @param {TicketModel} data
     * @return {Map}
     */
    static extractTicketDataFromModel(data) {
        const result = new Map();

        result.set('id', data.hallID);
        result.set('login', data.login);
        result.set('placeField', {
            'place': data.placeField.place,
            'row': data.placeField.row,
        });
        result.set('schedule', {
            'cinemaID': data.scheduleModel.cinemaID,
            'hallID': data.scheduleModel.hallID,
            'id': data.scheduleModel.id,
            'movieID': data.scheduleModel.movieID,
            'premierTime': data.scheduleModel.premierTime,
        });
        result.set('transactionDate', data.transactionDate);

        return result;
    }

    /**
     * Extract ticket from json to map.
     * @param {JSON} data
     * @return {Map}
     */
    static extractTicketFromJSON(data) {
        const result = new Map();

        result.set('id', data['HallID']);
        result.set('login', data['Login']);
        result.set('placeField', {
            'place': data['PlaceField']['Place'],
            'row': data['PlaceField']['Row'],
        });
        result.set('schedule', {
            'cinemaID': data['Schedule']['CinemaID'],
            'hallID': data['Schedule']['HallID'],
            'id': data['Schedule']['ID'],
            'movieID': data['Schedule']['MovieID'],
            'premierTime': data['Schedule']['PremierTime'],
        });
        result.set('transactionDate', data['TransactionDate']);

        return result;
    }

    /**
     * Extract ticket from json to map.
     * @param {JSON} data
     * @return {Map}
     */
    static extractTicketScheduleFromJSON(data) {
        const result = new Map();

        result.set('place', data['Place']);
        result.set('row', data['Row']);

        return result;
    }
}
