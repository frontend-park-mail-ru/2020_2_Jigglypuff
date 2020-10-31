import MovieModel from '../models/MovieModel';
import Extractor from '../utils/Extractor';

/** Class that contains MovieList ViewModel */
export default class MovieListViewModel {
    /**
     * Represents MovieList ViewModel constructor
     */
    constructor() {
        this.state = {
            ageGroup: [],
            country: [],
            pathToAvatar: [],
            description: [],
            director: [],
            duration: [],
            genre: [],
            name: [],
            ratingGlobal: [],
            ratingUser: [],
            reviews: [],
            starring: [],
            year: [],
        };
        this.getMovieActualListCommand = {exec: () => this.getMovieActualList()};
        this.getMovieListCommand = {exec: () => this.getMovieList()};
    }

    /**
     * Get actual movie list.
     * @return {Promise<number>}
     */
    async getMovieActualList() {
        const movieModel = new MovieModel();
        const response = await movieModel.getMovieList();

        const movieList = response.json();
        for (const movie of movieList) {
            const extractedMovieDataMapList = Extractor.extractMovieData(movie);
            for (const field of extractedMovieDataMapList) {
                this.state[field.keys()].append(field.values());
            }
        }

        return response.json().statusCode;
    }

    /**
     * Get movie list.
     * @return {Promise<number>}
     */
    async getMovieList() {
        const movieModel = new MovieModel();
        const response = await movieModel.getMovieActualList();

        const movieList = response.json();
        for (const movie of movieList) {
            const extractedMovieDataMapList = Extractor.extractMovieData(movie);
            for (const field of extractedMovieDataMapList) {
                this.state[field.keys()].append(field.values());
            }
        }

        return response.json().statusCode;
    }
}
