import BaseViewModel from './BaseViewModel';
import CinemaModel from '../models/CinemaModel';
import HallModel from '../models/HallModel';
import Extractor from '../utils/Extractor';
import Errors from '../consts/Errors';


/** Class that contains Cinema ViewModel */
export default class CinemaViewModel extends BaseViewModel {
    /**
     * Represents Movie ViewModel constructor
     */
    constructor() {
        super();

        this._cinemaModel = new CinemaModel();
        this._hallModel = new HallModel();
        this.state = {
            address: '',
            authorID: '',
            hallCount: '',
            id: '',
            name: '',
            pathToAvatar: '',
        };
        this.stateHall = {
            id: '',
            placeAmount: '',
            placeConfig: '',
        };
        this.getCinemaCommand = {exec: (id) => this.getCinema(id)};
    }

    /**
     * Get cinema info.
     * @param {int} id - cinema id
     * @return {Promise<Error>|Promise<Object>}
     */
    async getCinema(id) {
        this._cinemaModel.id = Number(id);
        const response = await this._cinemaModel.getCinema();

        if (response.ok) {
            const extractedCinemaDataMap = Extractor.extractCinemaData(this._cinemaModel);
            extractedCinemaDataMap.forEach((value, key) => {
                this.state[key] = value;
            });
            return this.state;
        }

        throw new Error(Errors.FailedToGetCinema);
    }

    /**
     * Get hall info.
     * @param {int} id - hall id
     * @return {Promise<Error>|Promise<Object>}
     */
    async getHall(id) {
        this._hallModel.id = Number(id);
        const response = await this._hallModel.getHall();

        if (response.ok) {
            const extractedHallDataMap = Extractor.extractHallData(this._hallModel);
            extractedHallDataMap.forEach((value, key) => {
                this.state[key] = value;
            });
            return this.state;
        }

        throw new Error(Errors.FailedToGetHall);
    }
}
