import BaseViewModel from './BaseViewModel';
import Errors from '../consts/Errors';
import Extractor from '../utils/Extractor';
import MovieModel from '../models/MovieModel';
import ScheduleModel from '../models/ScheduleModel';

/** Class that contains Movie ViewModel*/
export default class MovieViewModel extends BaseViewModel {
    /**
     * Represents Movie ViewModel constructor
     */
    constructor() {
        super();

        this._movieModel = new MovieModel();
        this._scheduleModel = new ScheduleModel();
        this.state = {
            actors: '',
            ageGroup: '',
            country: '',
            description: '',
            duration: '',
            genre: '',
            id: '',
            name: '',
            pathToAvatar: '',
            pathToSliderAvatar: '',
            personalRating: 0,
            producer: '',
            rating: '',
            ratingCount: 0,
            releaseYear: '',
        };
        this.schedule = [];

        this.getMovieCommand = {exec: (id) => this.getMovie(id)};
        this.getScheduleCommand = {exec: (movieID, cinemaID, premierTime) => this.getSchedule(movieID, cinemaID, premierTime)};
        this.rateMovieCommand = {exec: () => this.rateMovie()};
    }

    /**
     * Add movie to state array.
     * @param {JSON} scheduleElement
     */
    _addScheduleElement(scheduleElement) {
        const extractedScheduleMap = Extractor.extractScheduleFromJSON(scheduleElement);
        this.schedule.push({
            cinemaID: '',
            cost: '',
            data: '',
            hallID: '',
            id: '',
            movieID: '',
            premierTime: '',
            time: '',
        });
        extractedScheduleMap.forEach((value, key) => {
            this.schedule[this.schedule.length - 1][key] = value;
        });

        this.schedule[this.schedule.length - 1]['time'] = this.schedule[this.schedule.length - 1]['premierTime'].replace(/\d{4}-\d{2}-\d{2}T/, '');
        this.schedule[this.schedule.length - 1]['time'] = this.schedule[this.schedule.length - 1]['time']
            .replace(this.schedule[this.schedule.length - 1]['time'].replace(/\d{2}:\d{2}/, ''), '');

        this.schedule[this.schedule.length - 1]['date'] = this.schedule[this.schedule.length - 1]['premierTime'].slice(8, 10) + '.' +
            this.schedule[this.schedule.length - 1]['premierTime'].slice(5, 7) + '.' +
            this.schedule[this.schedule.length - 1]['premierTime'].slice(0, 4);
    }

    /**
     * Get movie info.
     * @param {int} id - movie id
     * @return {Promise<Error>|Promise<Object>}
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

        throw new Error(Errors.FailedToGetMovie);
    }

    /**
     * Rate movie.
     * @return {Promise<JSON>}
     */
    async rateMovie() {
        this._movieModel.id = Number(this.state.id);
        this._movieModel.personalRating = Number(this.state.personalRating);

        const response = await this._movieModel.rate();

        return response.json();
    }

    /**
     * Get movie schedule.
     * @param {int} movieID
     * @param {int} cinemaID
     * @param {string} premierTime
     * @return {Promise<Error>|Promise<Object>}
     */
    async getSchedule(movieID, cinemaID, premierTime) {
        this._scheduleModel.movieID = Number(movieID);
        this._scheduleModel.cinemaID = Number(cinemaID);
        this._scheduleModel.premierTime = premierTime;

        const response = await this._scheduleModel.getSchedule(movieID, cinemaID, premierTime);

        if (response.ok) {
            const scheduleList = await response.json();
            for (const scheduleElement of scheduleList) {
                this._addScheduleElement(scheduleElement);
            }
            if (!this.schedule.length) {
                throw new Error(Errors.ListIsEmpty);
            }

            return this.schedule;
        }

        throw new Error(Errors.FailedToGetSchedule);
    }
}
