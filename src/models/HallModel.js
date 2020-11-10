import Routes from '../consts/Routes';

/** Class that contains Hall model */
export default class HallModel {
    /**
     * Declare HallModel attributes.
     */
    constructor() {
        this._id = null;
        this._placeAmount = null;
        this._placeConfig = null;
    }

    /**
     * Get hall id.
     * @return {null|Number}
     */
    get id() {
        return this._id;
    }

    /**
     * Get hall place amount.
     * @return {null|Number}
     */
    get placeAmount() {
        return this._placeAmount;
    }

    /**
     * Get hall place config.
     * @return {null|String}
     */
    get placeConfig() {
        return this._placeConfig;
    }

    /**
     * Set hall id to "id" variable value
     * @param {any} id
     */
    set id(id) {
        this._id = id;
    }

    /**
     * Set hall place amount to "placeAmount" variable value
     * @param {any} placeAmount
     */
    set placeAmount(placeAmount) {
        this._placeAmount = placeAmount;
    }

    /**
     * Set hall place config to "placeConfig" variable value
     * @param {any} placeConfig
     */
    set placeConfig(placeConfig) {
        this._placeConfig = placeConfig;
    }

    /**
     * Get hall.
     * @return {Promise<Response>}
     */
    async getHall() {
        const response = await fetch(Routes.Host + Routes.Hall.replace(/:id/, this._id), {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            this._id = data['ID'];
            this._placeAmount = data['PlaceAmount'];
            this._placeConfig = data['PlaceConfig'];
        }

        return response;
    }
}
