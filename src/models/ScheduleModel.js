import Validator from 'utils/Validator';
import Routes from 'consts/Routes';

/** Class that contains Schedule model */
export default class ScheduleModel {
    /**
     * Declare ScheduleModel attributes.
     */
    constructor() {
        this._cinemaID = null;
        this._cost = null;
        this._hallID = null;
        this._id = null;
        this._movieID = null;
        this._premierTime = null;
    }

    /**
     * Get schedule cinema id.
     * @return {null|Number}
     */
    get cinemaID() {
        return this._cinemaID;
    }


    /**
     * Get ticket cost.
     * @return {null|Number}
     */
    get cost() {
        return this._cost;
    }

    /**
     * Get schedule hall id.
     * @return {null|Number}
     */
    get hallID() {
        return this._hallID;
    }

    /**
     * Get schedule id.
     * @return {null|Number}
     */
    get id() {
        return this._id;
    }

    /**
     * Get schedule movie id.
     * @return {null|Number}
     */
    get movieID() {
        return this._movieID;
    }

    /**
     * Get schedule premier time.
     * @return {null|string}
     */
    get premierTime() {
        return this._premierTime;
    }

    /**
     * Set schedule cinema id to "cinemaID" variable value if valid else, null.
     * @param {any} cinemaID
     */
    set cinemaID(cinemaID) {
        if (Validator.validateUINT(cinemaID)) {
            this._cinemaID = Number(cinemaID);
        } else {
            this._cinemaID = null;
        }
    }

    /**
     * Set ticket cost to "cost" variable value if valid else, null.
     * @param {any} cost
     */
    set cost(cost) {
        if (Validator.validateUINT(cost)) {
            this._cost = Number(cost);
        } else {
            this._cost = null;
        }
    }

    /**
     * Set schedule hall id to "hallID" variable value if valid else, null.
     * @param {any} hallID
     */
    set hallID(hallID) {
        if (Validator.validateUINT(hallID)) {
            this._hallID = Number(hallID);
        } else {
            this._hallID = null;
        }
    }

    /**
     * Set schedule id to "id" variable value if valid else, null.
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
     * Set schedule movie id to "movieID" variable value if valid else, null.
     * @param {any} movieID
     */
    set movieID(movieID) {
        if (Validator.validateUINT(movieID)) {
            this._movieID = Number(movieID);
        } else {
            this._movieID = null;
        }
    }

    /**
     * Set schedule premier time to "premierTime" variable value if valid else, null.
     * @param {any} premierTime
     */
    set premierTime(premierTime) {
        this._premierTime = premierTime.toString();
    }

    /**
     * Get movie schedule.
     * @param {int} movieID
     * @param {int} cinemaID
     * @param {string} premierTime
     * @return {Promise<Response>}
     */
    async getSchedule(movieID = 0, cinemaID = 0, premierTime = '2020-11-10') {
        return await fetch(`${Routes.HostAPI}${Routes.Schedule}?movie_id=${movieID}&cinema_id=${cinemaID}&date=${premierTime}`, {
            method: 'GET',
            credentials: 'include',
        });
    }

    /**
     * Get movie schedule.
     * @return {Promise<Response>}
     */
    async getScheduleByID() {
        const response = await fetch(`${Routes.HostAPI}${Routes.ScheduleID.replace(/:id/, this._id)}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            this._cinemaID = data['CinemaID'];
            this._cost = data['Cost'];
            this._hallID = data['HallID'];
            this._id = data['ID'];
            this._movieID = data['MovieID'];
            this._premierTime = data['PremierTime'];
        }

        return response;
    }
}
