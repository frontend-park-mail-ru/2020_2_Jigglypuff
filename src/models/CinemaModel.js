import Routes from '../consts/Routes';
import Validator from '../utils/Validator';

/** Class that contains Cinema model */
export default class CinemaModel {
    /**
     * Declare CinemaModel attributes.
     */
    constructor() {
        this._address = null;
        this._authorID = null;
        this._hallCount = null;
        this._id = null;
        this._name = null;
    }

    /**
     * Get cinema address.
     * @return {null} {string}
     */
    get address() {
        return this._address;
    }

    /**
     * Get cinema authorID.
     * @return {null} {int}
     */
    get authorID() {
        return this._authorID;
    }

    /**
     * Get cinema hallCount.
     * @return {null} {int}
     */
    get hallCount() {
        return this._hallCount;
    }

    /**
     * Get cinema id.
     * @return {null} {int}
     */
    get id() {
        return this._id;
    }

    /**
     * Get cinema name.
     * @return {null} {string}
     */
    get name() {
        return this._name;
    }

    /**
     * Set cinema address to "address" variable value if valid else, null.
     * @param {any} address
     */
    set address(address) {
        if (Validator.validateAddress(address)) {
            this._address = address.toString();
        } else {
            this._address = null;
        }
    }

    /**
     * Set cinema author id to "authorID" variable value if valid else, null.
     * @param {any} id
     */
    set authorID(id) {
        if (Validator.validateUINT(id)) {
            this._authorID = Number(id);
        } else {
            this._authorID = null;
        }
    }

    /**
     * Set cinema hall count to "hallCount" variable value if valid else, null.
     * @param {any} hallCount
     */
    set hallCount(hallCount) {
        if (Validator.validateUINT(hallCount)) {
            this._hallCount = Number(hallCount);
        } else {
            this._hallCount = null;
        }
    }

    /**
     * Set cinema id to "id" variable value if valid else, null.
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
     * Set cinema name to "name" variable value if valid else, null.
     * @param {any} name
     */
    set name(name) {
        if (Validator.validateCinemaName(name)) {
            this._name = name.toString();
        } else {
            this._name = null;
        }
    }

    /**
     * Get cinema list info.
     * @param {int} limit
     * @param {int} page
     * @return {Promise<Response>}
     */
    static async getCinemaList(limit = 10, page = 1) {
        return await fetch(Routes.Host + Routes.CinemaList +'?limit=' + limit + '&page=' + page, {
            method: 'GET',
        });
    }

    /**
     * Get cinema info.
     * @param {int} limit
     * @param {int} page
     * @return {Promise<Response>}
     */
    async getCinema(limit = 10, page = 1) {
        const response = await fetch(Routes.Host + Routes.CinemaPage.replace(/:id/, this._id), {
            method: 'GET',
        });

        if (response.ok) {
            const data = response.json();
            this._address = data['address'];
            this._authorID = data['authorID'];
            this._hallCount = data['hallCount'];
            this._id = data['id'];
            this._name = data['name'];
        }

        return response;
    }
}
