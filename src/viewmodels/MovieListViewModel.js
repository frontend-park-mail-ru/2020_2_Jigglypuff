import BaseViewModel from './BaseViewModel';
import Extractor from '../utils/Extractor';
import Errors from '../consts/Errors';
import MovieModel from '../models/MovieModel';

/** Class that contains MovieList ViewModel */
export default class MovieListViewModel extends BaseViewModel {
    /**
     * Represents MovieList ViewModel constructor
     */
    constructor() {
        super();

        this.state = [];
        this.getMovieActualListCommand = {exec: () => this.getMovieActualList()};
        this.getMovieListCommand = {exec: () => this.getMovieList()};
    }

    /**
     * Add movie to state array.
     * @param {JSON} movie
     */
    _addMovie(movie) {
        const movieModel = Extractor.extractMovieDataFromJSON(movie);
        const extractedMovieListDataMap = Extractor.extractMovieDataFromModel(movieModel);
        this.state.push({
            'ageGroup': '',
            'country': '',
            'description': '',
            'duration': '',
            'genre': '',
            'id': '',
            'name': '',
            'pathToAvatar': '',
            'personalRating': '',
            'producer': '',
            'rating': '',
            'ratingCount': '',
            'releaseYear': '',
        });
        extractedMovieListDataMap.forEach((value, key) => {
            this.state[this.state.length - 1][key] = value;
        });
    }

    /**
     * Get actual movie list.
     * @return {Promise<number>}
     */
    async getMovieActualList() {
        const response = await MovieModel.getMovieActualList();

        if (response.ok) {
            const movieList = await response.json();
            for (const movie of movieList) {
                this._addMovie(movie);
            }
            if (!this.state.length) {
                throw new Error(Errors.MovieActualListIsEmpty);
            }

            return this.state;
        }

        throw new Error(Errors.FailedToGetActualMovieList);
    }

    /**
     * Get movie list.
     * @return {Promise<number>}
     */
    async getMovieList() {
        const response = await MovieModel.getMovieList();

        if (response.ok) {
            const movieList = await response.json();
            for (const movie of movieList) {
                this._addMovie(movie);
            }
            if (!this.state.length) {
                throw new Error(Errors.MovieListIsEmpty);
            }

            return this.state;
        }

        throw new Error(Errors.FailedToGetMovieList);
    }
}
