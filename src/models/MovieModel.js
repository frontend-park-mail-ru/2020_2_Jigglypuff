import CSRF from 'utils/CSRF';
import Extractor from 'utils/Extractor';
import Routes from 'consts/Routes';
import Statuses from 'consts/Statuses';
import Validator from 'utils/Validator';

/** Class that contains Movie model */
export default class MovieModel {
    /**
     * Declare MovieModel attributes.
     */
    constructor() {
        this._actorList = null;
        this._ageGroup = null;
        this._country = null;
        this._description = null;
        this._duration = null;
        this._genreList = null;
        this._id = null;
        this._name = null;
        this._pathToAvatar = null;
        this._pathToSliderAvatar = null;
        this._personalRating = null;
        this._producer = null;
        this._rating = null;
        this._ratingCount = null;
        this._reviews = null;
        this._releaseYear = null;
    }

    /**
     * Get movie id.
     * @return {null|int}
     */
    get id() {
        return this._id;
    }

    /**
     * Get movie name.
     * @return {null|string}
     */
    get name() {
        return this._name;
    }

    /**
     * Get movie path to avatar.
     * @return {null|string}
     */
    get pathToAvatar() {
        return this._pathToAvatar;
    }

    /**
     * Get movie path to slider avatar.
     * @return {null|string}
     */
    get pathToSliderAvatar() {
        return this._pathToSliderAvatar;
    }

    /**
     * Get movie description.
     * @return {null|string}
     */
    get description() {
        return this._description;
    }

    /**
     * Get movie producer.
     * @return {null|string}
     */
    get producer() {
        return this._producer;
    }

    /**
     * Get movie genre list.
     * @return {null|Array}
     */
    get genreList() {
        return this._genreList;
    }

    /**
     * Get movie duration.
     * @return {null|int}
     */
    get duration() {
        return this._duration;
    }

    /**
     * Get movie country.
     * @return {null|string}
     */
    get country() {
        return this._country;
    }

    /**
     * Get movie year.
     * @return {null|int}
     */
    get releaseYear() {
        return this._releaseYear;
    }

    /**
     * Get movie global rating.
     * @return {null|float}
     */
    get rating() {
        return this._rating;
    }

    /**
     * Get movie user rating.
     * @return {null|float}
     */
    get personalRating() {
        return this._personalRating;
    }

    /**
     * Get movie age limit.
     * @return {null|int}
     */
    get ageGroup() {
        return this._ageGroup;
    }

    /**
     * Get movie rating count.
     * @return {null|int}
     */
    get ratingCount() {
        return this._ratingCount;
    }

    /**
     * Get movie reviews.
     * @return {null|Array}
     */
    get reviews() {
        return this._reviews;
    }

    /**
     * Get movie cast.
     * @return {null|Array}
     */
    get actorList() {
        return this._actorList;
    }

    /**
     * Set movie name to "name" variable value if valid else, null.
     * @param {any} name
     */
    set name(name) {
        this._name = name.toString();
    }

    /**
     * Set movie description to "description" variable value if valid else, null.
     * @param {any} description
     */
    set description(description) {
        this._description = description;
    }

    /**
     * Set movie producer to "producer" variable value if valid else, null.
     * @param {any} producer
     */
    set producer(producer) {
        this._producer = producer.toString();
    }

    /**
     * Set movie age limit to "ageGroup" variable value if valid else, null.
     * @param {any} ageGroup
     */
    set ageGroup(ageGroup) {
        this._ageGroup = ageGroup;
    }


    /**
     * Set movie country to "country" variable value if valid else, null.
     * @param {any} country
     */
    set country(country) {
        this._country = country;
    }

    /**
     * Set movie duration to "duration" variable value if valid else, null.
     * @param {any} duration
     */
    set duration(duration) {
        this._duration = duration;
    }

    /**
     * Set movie genre list to "genreList" variable value if valid else, null.
     * @param {Array<Object>} genreList
     */
    set genreList(genreList) {
        if (Array.isArray(genreList)) {
            this._genreList = genreList;
        } else {
            this._genreList = null;
        }
    }

    /**
     * Set movie id to "id" variable value if valid else, null.
     * @param {any} id
     */
    set id(id) {
        if (Validator.validateUINT(id)) {
            this._id = Number(id);
        } else {
            this._id = null;
        }
    }

    /**
     * Set movie rating count to "ratingCount" variable value if valid else, null.
     * @param {any} ratingCount
     */
    set ratingCount(ratingCount) {
        if (Validator.validateUINT(ratingCount)) {
            this._ratingCount = Number(ratingCount);
        } else {
            this._ratingCount = null;
        }
    }

    /**
     * Set movie rating to "rating" variable value if valid else, null.
     * @param {any} rating
     */
    set rating(rating) {
        if (Validator.validateMovieRating(rating)) {
            this._rating = Number(rating);
        } else {
            this._rating = null;
        }
    }

    /**
     * Set movie user rating to "personalRating" variable value if valid else, null.
     * @param {any} personalRating
     */
    set personalRating(personalRating) {
        if (Validator.validateMovieRatingUser(personalRating)) {
            this._personalRating = Number(personalRating);
        } else {
            this._personalRating = null;
        }
    }

    /**
     * Set movie year to "year" variable value if valid else, null.
     * @param {any} year
     */
    set releaseYear(year) {
        if (Validator.validateMovieYear(year)) {
            this._releaseYear = year;
        } else {
            this._releaseYear = null;
        }
    }

    /**
     * Set movie path to avatar to "pathToAvatar" variable
     * @param {any} pathToAvatar
     */
    set pathToAvatar(pathToAvatar) {
        this._pathToAvatar = pathToAvatar.toString();
    }

    /**
     * Set movie path to slider avatar to "pathToSliderAvatar" variable
     * @param {any} pathToSliderAvatar
     */
    set pathToSliderAvatar(pathToSliderAvatar) {
        this._pathToSliderAvatar = pathToSliderAvatar.toString();
    }

    /**
     * Set movie reviews to "reviews" variable value if valid else, null.
     * @param {any} reviews
     */
    set reviews(reviews) {
        if (Validator.validateText(reviews)) {
            if (!this._reviews) {
                this._reviews = [];
            }
            this._reviews.push(reviews.toString());
        }
    }

    /**
     * Set movie actors list to "actorList" variable value if valid else, null.
     * @param {Array<Object>} actorList
     */
    set actorList(actorList) {
        if (Array.isArray(actorList)) {
            this._actorList = actorList;
        } else {
            this._actorList = null;
        }
    }

    /**
     * Rate movie.
     * @return {Promise<Response>}
     */
    async rate() {
        const response = await fetch(`${Routes.HostAPI}${Routes.RateMovie}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({'id': this._id, 'rating': this._personalRating}),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': localStorage['X-CSRF-Token'],
            },
        });

        if (!response.ok) {
            if (response.status === Statuses.Forbidden) {
                await CSRF.getCSRF();
                await this.rate();
            }
        }

        return response;
    }

    /**
     * Get movie info.
     * @return {Promise<Response>}
     */
    async getMovie() {
        const response = await fetch(`${Routes.HostAPI}${Routes.MoviePage.replace(/:id/, this._id)}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            Extractor.extractMovieDataFromJSON(await response.json(), this);
        }

        return response;
    }

    /**
     * Get movie list info.
     * @param {int} limit
     * @param {int} page
     * @return {Promise<Response>}
     */
    static async getMovieList(limit = 11, page = 1) {
        return await fetch(`${Routes.HostAPI}${Routes.MovieList}?limit=${limit}&page=${page}`, {
            method: 'GET',
            credentials: 'include',
        });
    }

    /**
     * Get actual movie list info.
     * @param {int} limit
     * @param {int} page
     * @param {string} date
     * @return {Promise<Response>}
     */
    static async getMovieActualList(limit = 11, page = 1, date= '') {
        return await fetch(`${Routes.HostAPI}${Routes.MovieListActual}?limit=${limit}&page=${page}&date=${date}`, {
            method: 'GET',
            credentials: 'include',
        });
    }

    /**
     * Get recommendations list.
     * @return {Promise<Response>}
     */
    static async getRecommendationsList() {
        return await fetch(`${Routes.HostAPI}${Routes.RecommendationsList}`, {
            method: 'GET',
            credentials: 'include',
        });
    }
}
