import Validator from '../utils/Validator';

/** Class that contains Movie model */
export default class MovieModel {
    /**
     * Declare MovieModel attributes.
     */
    constructor() {
        this._ageLimit = null;
        this._country = null;
        this._cover = null;
        this._description = null;
        this._director = null;
        this._duration = null;
        this._genre = null;
        this._name = null;
        this._ratingGlobal = null;
        this._ratingUser = null;
        this._reviews = null;
        this._starring = null;
        this._year = null;
    }

    /**
     * Get movie name.
     * @return {null} {string}
     */
    get name() {
        return this._name;
    }

    /**
     * Get movie cover.
     * @return {null} {Image}
     */
    get cover() {
        return this._cover;
    }

    /**
     * Get movie description.
     * @return {null} {string}
     */
    get description() {
        return this._description;
    }

    /**
     * Get movie director.
     * @return {null} {string}
     */
    get director() {
        return this._director;
    }

    /**
     * Get movie genre.
     * @return {null} {Array}
     */
    get genre() {
        return this._genre;
    }

    /**
     * Get movie duration.
     * @return {null} {int}
     */
    get duration() {
        return this._duration;
    }

    /**
     * Get movie country.
     * @return {null} {string}
     */
    get country() {
        return this._country;
    }

    /**
     * Get movie year.
     * @return {null} {int}
     */
    get year() {
        return this._year;
    }

    /**
     * Get movie global rating.
     * @return {null} {float}
     */
    get ratingGlobal() {
        return this._ratingGlobal;
    }

    /**
     * Get movie user rating.
     * @return {null} {float}
     */
    get ratingUser() {
        return this._ratingUser;
    }

    /**
     * Get movie age limit.
     * @return {null} {int}
     */
    get ageLimit() {
        return this._ageLimit;
    }

    /**
     * Get movie reviews.
     * @return {null} {Array}
     */
    get reviews() {
        return this._reviews;
    }

    /**
     * Get movie cast.
     * @return {null} {Array}
     */
    get starring() {
        return this._starring;
    }

    /**
     * Set movie name to "name" variable value if valid else, null.
     * @param {any} name
     */
    set name(name) {
        if (Validator.validateMovieName(name)) {
            this._name = name.toString();
        } else {
            this._name = null;
        }
    }

    /**
     * Set movie description to "description" variable value if valid else, null.
     * @param {any} description
     */
    set description(description) {
        if (Validator.validateMovieDescription(description)) {
            this._description = description.toString();
        } else {
            this._description = null;
        }
    }

    /**
     * Set movie director to "director" variable value if valid else, null.
     * @param {any} director
     */
    set director(director) {
        const nameParts = director.toString().split(' ');
        for (const part of nameParts) {
            if (!Validator.validateName(part)) {
                this._director = null;
                return;
            }
        }
        this._director = director.toString();
    }

    /**
     * Set movie age limit to "ageLimit" variable value if valid else, null.
     * @param {any} ageLimit
     */
    set ageLimit(ageLimit) {
        if (Validator.validateMovieAgeLimit(ageLimit)) {
            this._ageLimit = ageLimit;
        } else {
            this._ageLimit = null;
        }
    }


    /**
     * Set movie country to "country" variable value if valid else, null.
     * @param {any} country
     */
    set country(country) {
        if (Validator.validateName(country)) {
            this._country = country;
        } else {
            this._country = null;
        }
    }

    /**
     * Set movie duration to "duration" variable value if valid else, null.
     * @param {any} duration
     */
    set duration(duration) {
        if (Validator.validateMovieDuration(duration)) {
            this._duration = duration;
        } else {
            this._duration = null;
        }
    }

    /**
     * Set movie genre to "genre" variable value if valid else, null.
     * @param {any} genre
     */
    set genre(genre) {
        if (Validator.validateMovieGenre(genre)) {
            if (!genre) {
                this._genre = [];
            }
            this._genre.append(genre.toString());
        }
    }

    /**
     * Set movie global rating to "ratingGlobal" variable value if valid else, null.
     * @param {any} ratingGlobal
     */
    set ratingGlobal(ratingGlobal) {
        if (Validator.validateMovieRatingGlobal(ratingGlobal)) {
            this._ratingGlobal = Number(ratingGlobal);
        } else {
            this._ratingGlobal = null;
        }
    }

    /**
     * Set movie user rating to "ratingUser" variable value if valid else, null.
     * @param {any} ratingUser
     */
    set ratingUser(ratingUser) {
        if (Validator.validateMovieRatingUser(ratingUser)) {
            this._ratingUser = Number(ratingUser);
        } else {
            this._ratingUser = null;
        }
    }

    /**
     * Set movie year to "year" variable value if valid else, null.
     * @param {any} year
     */
    set year(year) {
        if (Validator.validateMovieYear(year)) {
            this._year = year;
        } else {
            this._year = null;
        }
    }

    /**
     * Set movie reviews to "reviews" variable value if valid else, null.
     * @param {any} reviews
     */
    set reviews(reviews) {
        if (Validator.validateText(reviews)) {
            if (!reviews) {
                this._reviews = [];
            }
            this._reviews.append(reviews.toString());
        }
    }

    /**
     * Set movie starring to "starring" variable value if valid else, null.
     * @param {any} starring
     */
    set starring(starring) {
        const nameParts = starring.toString().split(' ');
        for (const part of nameParts) {
            if (Validator.validateName(part)) {
                if (!starring) {
                    this._starring = [];
                }
                this._starring.append(starring.toString());
            }
        }
    }
}
