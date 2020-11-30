import Extractor from 'utils/Extractor';
import Errors from 'consts/Errors';
import ScheduleModel from 'models/ScheduleModel';

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
            date: '',
            hallID: '',
            id: '',
            movieID: '',
            premierTime: '',
            time: '',
        };

        this.getSessionCommand = {exec: (id) => this.getSchedule(id)};
    }

    /**
     * Get schedule by id.
     * @param {int} id - schedule id
     * @return {Promise<Error>|Promise<Object>}
     */
    async getSchedule(id) {
        this._scheduleModel.id = Number(id);
        const response = await this._scheduleModel.getScheduleByID();

        if (response.ok) {
            const extractedScheduleDataMap = Extractor.extractScheduleDataFromModel(this._scheduleModel);
            extractedScheduleDataMap.forEach((value, key) => {
                this.state[key] = value;
            });

            this.state.time = this.state.premierTime.replace(/\d{4}-\d{2}-\d{2}T/, '');
            this.state.time = this.state.time.replace(this.state.time.replace(/\d{2}:\d{2}/, ''), '');

            this.state.date = `${this.state.premierTime.slice(8, 10)}.${this.state.premierTime.slice(5, 7)}.${this.state.premierTime.slice(0, 4)}`;

            return this.state;
        }

        throw new Error(Errors.FailedToGetSchedule);
    }
}
