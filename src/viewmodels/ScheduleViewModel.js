import Extractor from '../utils/Extractor';
import Errors from '../consts/Errors';
import ScheduleModel from '../models/ScheduleModel';

/** Class that contains Schedule ViewModel */
export default class ScheduleViewModel {
    /**
     * Represents Schedule ViewModel constructor
     */
    constructor() {
        this._scheduleModel = new ScheduleModel();
        this.state = {
            cinemaID: '',
            cost: '',
            hallID: '',
            id: '',
            movieID: '',
            premierTime: '',
        };
    }

    /**
     * Get schedule by id.
     * @param {int} id - movie id
     * @return {Promise<Error>|Promise<Object>}
     */
    async getMovie(id) {
        this._scheduleModel.id = Number(id);
        const response = await this._scheduleModel.getScheduleByID();

        if (response.ok) {
            const extractedScheduleDataMap = Extractor.extractScheduleDataFromModel(this._scheduleModel);
            extractedScheduleDataMap.forEach((value, key) => {
                this.state[key] = value;
            });

            return this.state;
        }

        throw new Error(Errors.FailedToGetSchedule);
    }
}