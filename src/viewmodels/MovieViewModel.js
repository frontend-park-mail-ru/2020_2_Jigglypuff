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
            ageGroup: '',
            country: '',
            pathToAvatar: '',
            description: '',
            director: '',
            duration: '',
            genre: '',
            name: '',
            ratingGlobal: '',
            ratingUser: '',
            reviews: '',
            starring: '',
            year: '',
        };
        this.getMovieCommand = {exec: () => this.getMovie()};
        this.rateMovieCommand = {exec: () => this.rateMovie()};
    }

    /**
     * Get movie info.
     * @return {Promise<void>}
     */
    async getMovie() {
        await this._movieModel.getMovie();

        const extractedMovieDataMap = Extractor.extractMovieData(this._movieModel);
        for (const field of extractedMovieDataMap) {
            this.state[field.keys()] = field.values();
        }
    }

    /**
     * Rate movie.
     * @return {Promise<number>}
     */
    async rateMovie() {
        const response = await this._movieModel.rate();

        return response.json().statusCode;
    }
}
