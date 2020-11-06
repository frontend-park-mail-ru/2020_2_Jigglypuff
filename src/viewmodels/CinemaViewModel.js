import CinemaModel from '../models/CinemaModel';
import Extractor from '../utils/Extractor';

/** Class that contains Cinema ViewModel */
export default class CinemaViewModel {
    /**
     * Represents Movie ViewModel constructor
     */
    constructor() {
        this._cinemaModel = new CinemaModel.CinemaModel();
        this.state = {
            'address': '',
            'authorID': '',
            'hallCount': '',
            'id': '',
            'name': '',
        };
        this.getCinemaCommand = {exec: (id) => this.getCinema(id)};
    }

    /**
     * Get cinema info.
     * @param {int} id - cinema id
     * @return {Promise<any>}
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

        throw new Error('failed to get cinema');
    }
}
