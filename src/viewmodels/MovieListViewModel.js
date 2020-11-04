import Extractor from '../utils/Extractor';
import MovieModel from '../models/MovieModel';

/** Class that contains MovieList ViewModel */
export default class MovieListViewModel {
    /**
     * Represents MovieList ViewModel constructor
     */
    constructor() {
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
        this.state.push(new Map([
            ['ageGroup', ''],
            ['country', ''],
            ['description', ''],
            ['duration', ''],
            ['genre', ''],
            ['id', ''],
            ['name', ''],
            ['pathToAvatar', ''],
            ['personalRating', ''],
            ['producer', ''],
            ['rating', ''],
            ['ratingCount', ''],
            ['releaseYear', ''],
        ]));
        extractedMovieListDataMap.forEach((value, key) => {
            this.state[this.state.length - 1].set(key, value);
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
                throw new Error('movie actual list is empty');
            }

            return this.state;
        }

        throw new Error('failed to get movie actual list');
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
                throw new Error('movie list is empty');
            }

            return this.state;
        }

        throw new Error('failed to get movie list');
    }
}
