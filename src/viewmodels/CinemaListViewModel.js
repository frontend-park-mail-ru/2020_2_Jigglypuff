import BaseViewModel from './BaseViewModel';
import CinemaModel from '../models/CinemaModel';
import Errors from '../consts/Errors';
import Extractor from '../utils/Extractor';

/** Class that contains CinemaList ViewModel */
export default class CinemaListViewModel extends BaseViewModel {
    /**
     * Represents CinemaList ViewModel constructor
     */
    constructor() {
        super();

        this.state = [];
        this.getCinemaListCommand = {exec: () => this.getCinemaList()};
    }

    /**
     * Get cinema list.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getCinemaList() {
        const response = await CinemaModel.CinemaModel.getCinemaList();

        if (response.ok) {
            const cinemaList = await response.json();
            for (const cinema of cinemaList) {
                const cinemaModel = new CinemaModel();
                cinemaModel.address = cinema['Address'];
                cinemaModel.authorID = cinema['AuthorID'];
                cinemaModel.hallCount = cinema['HallCount'];
                cinemaModel.id = cinema['ID'];
                cinemaModel.name = cinema['Name'];

                const extractedCinemaDataMap = Extractor.extractCinemaData(cinemaModel);
                this.state.push({
                    'address': '',
                    'authorID': '',
                    'hallCount': '',
                    'id': '',
                    'name': '',
                });
                extractedCinemaDataMap.forEach((value, key) => {
                    this.state[this.state.length - 1][key] = value;
                });
            }
            return this.state;
        }

        throw new Error(Errors.FailedToGetCinemaList);
    }
}