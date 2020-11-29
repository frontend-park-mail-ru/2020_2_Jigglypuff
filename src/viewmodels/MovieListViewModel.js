import BaseViewModel from 'viewmodels/BaseViewModel';
import Errors from 'consts/Errors';
import Extractor from 'utils/Extractor';
import MovieModel from 'models/MovieModel';

/** Class that contains MovieList ViewModel */
export default class MovieListViewModel extends BaseViewModel {
    /**
     * Represents MovieList ViewModel constructor
     */
    constructor() {
        super();

        this.state = [];
        this.getMovieActualListCommand = {exec: (date, limit, page) => this.getMovieActualList(limit, page, date)};
        this.getMovieListCommand = {exec: (limit, page) => this.getMovieList(limit, page)};
        this.getRecommendationsListCommand = {exec: () => this.getRecommendations()};
    }

    /**
     * Add movie to state array.
     * @param {JSON} movie
     */
    _addMovie(movie) {
        const movieModel = Extractor.extractMovieDataFromJSON(movie);
        const extractedMovieListDataMap = Extractor.extractMovieDataFromModel(movieModel);
        this.state.push({
            actorList: '',
            ageGroup: '',
            country: '',
            description: '',
            duration: '',
            genreList: '',
            id: '',
            name: '',
            pathToAvatar: '',
            pathToSliderAvatar: '',
            producer: '',
            rating: '',
            ratingCount: '',
            releaseYear: '',
        });
        extractedMovieListDataMap.forEach((value, key) => {
            this.state[this.state.length - 1][key] = value;
        });
    }

    /**
     * Get actual movie list.
     * @param {int} limit
     * @param {int} page
     * @param {string} date
     * @return {Promise<Error>|Promise<Object>}
     */
    async getMovieActualList(limit = 11, page = 1, date = '') {
        const response = await MovieModel.getMovieActualList(limit, page, date);

        if (response.ok) {
            const movieList = await response.json();
            for (const movie of movieList) {
                this._addMovie(movie);
            }
            if (!this.state.length) {
                throw new Error(Errors.ListIsEmpty);
            }

            return this.state;
        }

        throw new Error(Errors.FailedToGetActualMovieList);
    }

    /**
     * Get movie list.
     * @param {int} limit
     * @param {int} page
     * @return {Promise<Error>|Promise<Object>}
     */
    async getMovieList(limit = 11, page = 1) {
        const response = await MovieModel.getMovieList(limit, page);

        if (response.ok) {
            const movieList = await response.json();
            for (const movie of movieList) {
                this._addMovie(movie);
            }
            if (!this.state.length) {
                throw new Error(Errors.ListIsEmpty);
            }

            return this.state;
        }

        throw new Error(Errors.FailedToGetMovieList);
    }

    /**
     * Get recommendations list.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getRecommendations() {
        const response = await MovieModel.getRecommendationsList();

        if (response.ok) {
            const movieList = await response.json();
            for (const movie of movieList) {
                this._addMovie(movie);
            }
            if (!this.state.length) {
                throw new Error(Errors.ListIsEmpty);
            }

            return this.state;
        }

        throw new Error(Errors.FailedToGetMovieList);
    }
}
