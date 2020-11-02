import CinemaModel from '../models/CinemaModel';
import Extractor from "../utils/Extractor";

/** Class that contains Cinema ViewModel */
export default class CinemaViewModel {
    /**
     * Represents Movie ViewModel constructor
     */
    constructor() {
        this._cinemaModel = new CinemaModel();
        this.state = {
            address: '',
            authorID: '',
            hallCount: '',
            id: '',
            name: '',
        };
        this.getCinemaCommand = {exec: () => this.getCinema()};
    }

    /**
     * Get cinema info.
     * @return {Promise<Error>}
     */
    async getCinema() {
        const response = await this._cinemaModel.getCinema();

        if (response.ok) {
            const extractedCinemaDataMap = Extractor.extractCinemaData(this._cinemaModel);
            for (const field of extractedCinemaDataMap) {
                this.state[field.keys()] = field.values();
            }
            return null;
        }

        return new Error('failed to get cinema');
    }
}