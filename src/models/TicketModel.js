import ScheduleModel from './ScheduleModel';
import Routes from '../consts/Routes';
import CSRF from '../utils/CSRF';

/** Class that contains Ticket model */
export default class TicketModel {
    /**
     * Declare TicketModel attributes.
     */
    constructor() {
        this._hallID = null;
        this._id = null;
        this._login = null;
        this._placeField = {
            'place': null,
            'row': null,
        };
        this._scheduleModel = new ScheduleModel();
        this._scheduleID = null;
        this._transactionDate = null;
    }

    /**
     * Get ticket hall id.
     * @return {null|Number}
     */
    get hallID() {
        return this._hallID;
    }

    /**
     * Get ticket id.
     * @return {null|Number}
     */
    get id() {
        return this._id;
    }

    /**
     * Get ticket user login.
     * @return {null|string}
     */
    get login() {
        return this._login;
    }

    /**
     * Get ticket place field.
     * @return {Object}
     */
    get placeField() {
        return this._placeField;
    }

    /**
     * Get ticket place field.
     * @return {null|Number}
     */
    get scheduleID() {
        return this._scheduleID;
    }

    /**
     * Get ticket transaction date.
     * @return {null|string}
     */
    get transactionDate() {
        return this._transactionDate;
    }

    /**
     * Get ticket schedule model.
     * @return {ScheduleModel}
     */
    get scheduleModel() {
        return this._scheduleModel;
    }

    /**
     * Set ticket hall id to "hallID" variable value
     * @param {any} hallID
     */
    set hallID(hallID) {
        this._hallID = hallID;
    }

    /**
     * Set ticket user login id to "login" variable value
     * @param {any} login
     */
    set login(login) {
        this._login = login;
    }

    /**
     * Set ticket user login id to "login" variable value
     * @param {any} placeField
     */
    set placeField(placeField) {
        this._placeField.place = placeField.place;
        this._placeField.row = placeField.row;
    }

    /**
     * Set ticket schedule id to "scheduleID" variable value
     * @param {any} scheduleID
     */
    set scheduleID(scheduleID) {
        this._scheduleID = scheduleID;
    }

    /**
     * Set ticket user login id to "login" variable value
     * @param {any} transactionDate
     */
    set transactionDate(transactionDate) {
        this._transactionDate = transactionDate.toString();
    }

    /**
     * Get user ticket list.
     * @return {Promise<Response>}
     */
    async getTicketList() {
        const response = await fetch(Routes.HostAPI + Routes.TicketList, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            if (response.status === 403) {
                await CSRF.getCSRF();
                await this.getTicketList();
            }
        }

        return response;
    }

    /**
     * Get user ticket.
     * @return {Promise<Response>}
     */
    async getTicket() {
        const response = await fetch(Routes.HostAPI + Routes.Ticket.replace(/:id/, this._id), {
            method: 'GET',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': localStorage['X-CSRF-Token'],
            },
        });

        if (!response.ok) {
            if (response.status === 403) {
                await CSRF.getCSRF();
                await this.getTicket();
            }
        }

        if (response.ok) {
            const data = await response.json();
            this._id = data['ID'];
            this._login = data['Login'];
            this._placeField.place = data['PlaceField']['Place'];
            this._placeField.row = data['PlaceField']['Row'];
            this._scheduleModel.cinemaID = data['Schedule']['CinemaID'];
            this._scheduleModel.cinemaID = data['Schedule']['Cost'];
            this._scheduleModel.hallID = data['Schedule']['HallID'];
            this._scheduleModel.id = data['Schedule']['ID'];
            this._scheduleModel.movieID = data['Schedule']['MovieID'];
            this._scheduleModel.premierTime = data['Schedule']['PremierTime'];
            this._transactionDate = data['TransactionDate'];
        }

        return response;
    }

    /**
     * Buy ticket.
     * @return {Promise<Response>}
     */
    async buyTicket() {
        const response = await fetch(Routes.HostAPI + Routes.TicketBuy, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': localStorage['X-CSRF-Token'],
            },
            body: JSON.stringify({'login': this._login.toString(),
                'placeField': {'Place': this._placeField.place, 'Row': this._placeField.row},
                'scheduleID': this._scheduleID}),
        });

        if (!response.ok) {
            if (response.status === 403) {
                await CSRF.getCSRF();
                await this.buyTicket();
            }
        }

        return response;
    }

    /**
     * Get schedule hall ticket list.
     * @return {Promise<Response>}
     */
    async getScheduleHallTicketList() {
        return await fetch(Routes.HostAPI + Routes.TicketScheduleList.replace(/:id/, this._scheduleID), {
            method: 'GET',
            credentials: 'include',
        });
    }
}
