import BaseViewModel from './BaseViewModel';
import CinemaModel from '../models/CinemaModel';
import Extractor from '../utils/Extractor';
import Errors from '../consts/Errors';


/** Class that contains Cinema ViewModel */
export default class CinemaViewModel extends BaseViewModel {
    /**
     * Represents Movie ViewModel constructor
     */
    constructor() {
        super();

        this._cinemaModel = new CinemaModel.CinemaModel();
        this.state = {
            address: '',
            authorID: '',
            hallCount: '',
            id: '',
            name: '',
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
}
