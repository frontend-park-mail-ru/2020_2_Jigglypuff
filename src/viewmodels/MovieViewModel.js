import BaseViewModel from 'viewmodels/BaseViewModel';
import Errors from 'consts/Errors';
import Extractor from 'utils/Extractor';
import MovieModel from 'models/MovieModel';
import ReplyModel from 'models/ReplyModel';
import ScheduleModel from 'models/ScheduleModel';

/** Class that contains Movie ViewModel*/
export default class MovieViewModel extends BaseViewModel {
    /**
     * Represents Movie ViewModel constructor
     */
    constructor() {
        super();

        this._movieModel = new MovieModel();
        this._replyModel = new ReplyModel();
        this._scheduleModel = new ScheduleModel();
        this.state = {
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
            personalRating: 0,
            producer: '',
            rating: '',
            ratingCount: 0,
            releaseYear: '',
        };
        this.replies = [];
        this.schedule = [];

        this.getMovieCommand = {exec: (id) => this.getMovie(id)};
        this.getRepliesCommand = {exec: (movieID, limit, page) => this.getReplies(movieID, limit, page)};
        this.getScheduleCommand = {exec: (movieID, cinemaID, premierTime) => this.getSchedule(movieID, cinemaID, premierTime)};
        this.rateMovieCommand = {exec: () => this.rateMovie()};
    }

    /**
     * Add movie to state array.
     * @param {JSON} scheduleElement
     */
    _addScheduleElement(scheduleElement) {
        const extractedScheduleMap = Extractor.extractScheduleDataFromJSON(scheduleElement);
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

        const day = this.schedule[this.schedule.length - 1]['premierTime'].slice(8, 10);
        const month = this.schedule[this.schedule.length - 1]['premierTime'].slice(5, 7);
        const year = this.schedule[this.schedule.length - 1]['premierTime'].slice(0, 4);
        this.schedule[this.schedule.length - 1]['date'] = `${day}.${month}.${year}`;
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
     * @return {Promise<Response>}
     */
    async rateMovie() {
        this._movieModel.id = Number(this.state.id);
        this._movieModel.personalRating = Number(this.state.personalRating);

        const response = await this._movieModel.rate();

        return response;
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

    /**
     * Add reply to replies state.
     * @param {JSON} reply
     */
    _addReply(reply) {
        const extractedRepliesMap = Extractor.extractRepliesFromJSON(reply);
        this.replies.push({
            movieID: '',
            text: '',
            userName: '',
            userRating: '',
            userSurname: '',
        });
        extractedRepliesMap.forEach((value, key) => {
            this.replies[this.replies.length - 1][key] = value;
        });
    }

    /**
     * Get movie replies.
     * @param {int} movieID
     * @param {int} limit
     * @param {int} page
     * @return {Promise<Error>|Promise<Object>}
     */
    async getReplies(movieID, limit = 10, page = 0) {
        this._replyModel.movieID = this.state.id;

        const response = await this._replyModel.getReplies(movieID, limit, page);

        if (response.ok) {
            const replies = await response.json();
            for (const reply of replies) {
                this._addReply(reply);
            }
            if (!this.replies.length) {
                throw new Error(Errors.ListIsEmpty);
            }

            return this.replies;
        }

        throw new Error(Errors.FailedToGetReplies);
    }

    /**
     * Create reply
     * @param {string} text
     * @return {Promise<int>}
     */
    async createReply(text) {
        this._replyModel.movieID = this.state.id;

        const response = this._replyModel.createReply();

        if (response.ok) {
            return response.ok;
        }

        return Errors.FailedToCreateReply;
    }
}
