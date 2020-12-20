import CSRF from 'utils/CSRF';
import Extractor from 'utils/Extractor';
import ScheduleModel from 'models/ScheduleModel';
import Statuses from 'consts/Statuses';
import Routes from 'consts/Routes';

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
        this._placeFields = null;
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
     * Get ticket place fields for purchase.
     * @return {Array<Object>}
     */
    get placeFields() {
        return this._placeFields;
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
     * Set ticket place fields for purchase to "placeFields" variable value if valid else, null.
     * @param {Array<Object>} placeFields
     */
    set placeFields(placeFields) {
        if (Array.isArray(placeFields)) {
            this._placeFields = placeFields;
        } else {
            this._placeFields = null;
        }
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
        const response = await fetch(`${Routes.HostAPI}${Routes.TicketList}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            if (response.status === Statuses.Forbidden) {
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
        const response = await fetch(`${Routes.HostAPI}${Routes.Ticket.replace(/:id/, this._id)}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': localStorage['X-CSRF-Token'],
            },
        });

        if (!response.ok) {
            if (response.status === Statuses.Forbidden) {
                await CSRF.getCSRF();
                await this.getTicket();
            }
        }

        if (response.ok) {
            Extractor.extractTicketModelFromJSON(await response.json(), this);
        }

        return response;
    }

    /**
     * Buy ticket.
     * @param {string} transactionHash - 0x123..567
     * @param {string} senderAddress - 0x123..567
     * @param {string} signedTransaction
     * @return {Promise<Response>}
     */
    async buyTicket(transactionHash = '', senderAddress = '', signedTransaction = '') {
        const response = await fetch(`${Routes.HostAPI}${Routes.TicketBuy}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': localStorage['X-CSRF-Token'],
                'X-Transaction-Hash': transactionHash,
                'X-Sender-Address': senderAddress,
                'X-Signed-Transaction': signedTransaction,
            },
            body: JSON.stringify({'login': this._login.toString(),
                'placeField': {'place': this._placeField.place, 'row': this._placeField.row},
                'scheduleID': this._scheduleID}),
        });

        if (!response.ok) {
            if (response.status === Statuses.Forbidden) {
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
        return await fetch(`${Routes.HostAPI}${Routes.TicketScheduleList.replace(/:id/, this._scheduleID)}`, {
            method: 'GET',
            credentials: 'include',
        });
    }
}
