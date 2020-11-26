import BaseViewModel from './BaseViewModel';
import CinemaModel from '../models/CinemaModel';
import Errors from '../consts/Errors';
import Extractor from '../utils/Extractor';

/** Class that contains cinemaList ViewModel */
export default class CinemaListViewModel extends BaseViewModel {
    /**
     * Represents cinemaList ViewModel constructor
     */
    constructor() {
        super();

        this.state = [];
        this.getCinemaListCommand = {exec: () => this.getCinemaList()};
    }

    /**
     * Add cinema state to array
     * @param {JSON} cinema
     * @private
     */
    _addCinema(cinema) {
        const cinemaModel = Extractor.extractCinemaDataFromJSON(cinema);
        const extractedCinemaListDataMap = Extractor.extractCinemaDataFromModel(cinemaModel);
        this.state.push({
            address: '',
            authorID: '',
            hallCount: '',
            id: '',
            name: '',
            pathToAvatar: '',
        });
        extractedCinemaListDataMap.forEach((value, key) => {
            this.state[this.state.length - 1][key] = value;
        });
    }

    /**
     * Get cinema list.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getCinemaList() {
        const response = await CinemaModel.getCinemaList();

        if (response.ok) {
            const cinemaList = await response.json();
            for (const cinema of cinemaList) {
                this._addCinema(cinema);
            }

            if (!this.state.length) {
                throw new Error(Errors.ListIsEmpty);
            }

            return this.state;
        }

        throw new Error(Errors.FailedToGetCinemaList);
    }
}
