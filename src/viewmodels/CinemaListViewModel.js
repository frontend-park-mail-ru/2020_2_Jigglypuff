import CinemaModel from '../models/CinemaModel';
import Extractor from '../utils/Extractor';

/** Class that contains CinemaList ViewModel */
export default class CinemaListViewModel {
    /**
     * Represents CinemaList ViewModel constructor
     */
    constructor() {
        this.state = {
            address: [],
            authorID: [],
            hallCount: [],
            id: [],
            name: [],
        };
        this.getCinemaListCommand = {exec: () => this.getCinemaList()};
    }

    /**
     * Get cinema list.
     * @return {Promise<Error>}
     */
    async getCinemaList() {
        const response = await CinemaModel.getCinemaList();

        if (response.ok) {
            const cinemaList = response.json();
            for (const cinema of cinemaList) {
                const cinemaModel = new CinemaModel();
                cinemaModel.address = cinema['address'];
                cinemaModel.authorID = cinema['authorID'];
                cinemaModel.hallCount = cinema['hallCount'];
                cinemaModel.id = cinema['id'];
                cinemaModel.name = cinema['name'];

                const extractedCinemaDataMapList = Extractor.extractCinemaData(cinemaModel);
                for (const field of extractedCinemaDataMapList) {
                    this.state[field.keys()].append(field.values());
                }
            }
            return null;
        }

        return new Error('failed to get cinema list');
    }
}