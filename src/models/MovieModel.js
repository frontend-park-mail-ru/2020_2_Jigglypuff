import Routes from '../consts/Routes';
import Validator from '../utils/Validator';

/** Class that contains Movie model */
export default class MovieModel {
    /**
     * Declare MovieModel attributes.
     */
    constructor() {
        this._ageGroup = null;
        this._country = null;
        this._description = null;
        this._duration = null;
        this._genre = null;
        this._id = null;
        this._name = null;
        this._pathToAvatar = null;
        this._personalRating = null;
        this._producer = null;
        this._rating = null;
        this._ratingCount = null;
        this._reviews = null;
        this._starring = null;
        this._releaseYear = null;
    }

    /**
     * Get movie id.
     * @return {null} {int}
     */
    get id() {
        return this._id;
    }

    /**
     * Get movie name.
     * @return {null} {string}
     */
    get name() {
        return this._name;
    }

    /**
     * Get movie path to avatar.
     * @return {null} {string}
     */
    get pathToAvatar() {
        return this._pathToAvatar;
    }

    /**
     * Get movie description.
     * @return {null} {string}
     */
    get description() {
        return this._description;
    }

    /**
     * Get movie producer.
     * @return {null} {string}
     */
    get producer() {
        return this._producer;
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
    get releaseYear() {
        return this._releaseYear;
    }

    /**
     * Get movie global rating.
     * @return {null} {float}
     */
    get rating() {
        return this._rating;
    }

    /**
     * Get movie user rating.
     * @return {null} {float}
     */
    get personalRating() {
        return this._personalRating;
    }

    /**
     * Get movie age limit.
     * @return {null} {int}
     */
    get ageGroup() {
        return this._ageGroup;
    }

    /**
     * Get movie rating count.
     * @return {null} {int}
     */
    get ratingCount() {
        return this._ratingCount;
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
     * Set movie producer to "producer" variable value if valid else, null.
     * @param {any} director
     */
    set producer(director) {
        const nameParts = director.toString().split(' ');
        for (const part of nameParts) {
            if (!Validator.validateName(part)) {
                this._producer = null;
                return;
            }
        }
        this._producer = director.toString();
    }

    /**
     * Set movie age limit to "ageGroup" variable value if valid else, null.
     * @param {any} ageGroup
     */
    set ageGroup(ageGroup) {
        if (Validator.validateMovieAgeLimit(ageGroup)) {
            this._ageGroup = ageGroup;
        } else {
            this._ageGroup = null;
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
            if (!this._genre) {
                this._genre = [];
            }
            this._genre.push(genre.toString());
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

    /**
     * Rate movie.
     * @return {Promise<Response>}
     */
    async rate() {
        return await fetch(Routes.Host + Routes.RateMovie, {
            method: 'POST',
            body: JSON.stringify({'id': this._id, 'rating': this._personalRating}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Get movie info.
     * @return {Promise<Response>}
     */
    async getMovie() {
        const response = await fetch(Routes.Host + Routes.MoviePage.replace(/:id/, this._id), {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            this._ageGroup = data['AgeGroup'];
            this._country = data['Country'];
            this._description = data['Description'];
            this._duration = data['Duration'];
            this._genre = data['Genre'];
            this._id = data['ID'];
            this._name = data['Name'];
            this._pathToAvatar = data['PathToAvatar'];
            this._personalRating = data['PersonalRating'];
            this._producer = data['Producer'];
            this._rating = data['Rating'];
            this._ratingCount = data['RatingCount'];
            this._releaseYear = data['ReleaseYear'];
        }

        return response;
    }

    /**
     * Get movie list info.
     * @param {int} limit
     * @param {int} page
     * @return {Promise<Response>}
     */
    static async getMovieList(limit = 10, page = 0) {
        return await fetch(Routes.Host + Routes.MovieList + '?limit=' + limit + '&page=' + page, {
            method: 'GET',
        });
    }

    /**
     * Get actual movie list info.
     * @param {int} limit
     * @param {int} page
     * @return {Promise<Response>}
     */
    static async getMovieActualList(limit = 10, page = 0) {
        return await fetch(Routes.Host + Routes.MovieList + '?limit=' + limit + '&page=' + page, {
            method: 'GET',
        });
    }
}
