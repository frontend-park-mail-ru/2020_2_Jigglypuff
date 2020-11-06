import MovieModel from '../models/MovieModel';
import Extractor from '../utils/Extractor';

/** Class that contains Movie ViewModel*/
export default class MovieViewModel {
    /**
     * Represents Movie ViewModel constructor
     */
    constructor() {
        this._movieModel = new MovieModel();
        this.state = {
            'ageGroup': '',
            'country': '',
            'description': '',
            'duration': '',
            'genre': '',
            'id': '',
            'name': '',
            'pathToAvatar': '',
            'personalRating': 0,
            'producer': '',
            'rating': '',
            'ratingCount': 0,
            'releaseYear': '',
        };
        this.getMovieCommand = {exec: (id) => this.getMovie(id)};
        this.rateMovieCommand = {exec: () => this.rateMovie()};
    }

    /**
     * Get movie info.
     * @param {int} id - movie id
     * @return {Promise<void>}
     */
    async getMovie(id) {
        this._movieModel.id = Number(id);
        const response = await this._movieModel.getMovie();

        if (response.ok) {
            const extractedMovieDataMap = Extractor.extractMovieDataFromModel(this._movieModel);
            extractedMovieDataMap.forEach((value, key) => {
                this.state[key] = value;
            });

            return this.state;
        }

        throw new Error('failed to get movie');
    }

    /**
     * Rate movie.
     * @return {Promise<number>}
     */
    async rateMovie() {
        const response = await this._movieModel.rate();

        return response.json();
    }
}
