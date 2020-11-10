import Errors from '../consts/Errors';
import TicketModel from '../models/TicketModel';
import Extractor from '../utils/Extractor';

/** Class that contains TicketList ViewModel */
export default class TicketViewModel {
    /**
     * Represents TicketViewModel constructor
     */
    constructor() {
        this.state = [];
        this.getTicketListCommand = {exec: () => this.getTicketList()};
    }

    /**
     * Add ticket to state array.
     * @param {JSON} ticket
     */
    _addTicket(ticket) {
        const extractedTicketDataMap = Extractor.extractTicketFromJSON(ticket);
        this.state.push({
            hallID: '',
            id: '',
            login: '',
            placeField: {
                place: '',
                row: '',
            },
            schedule: {
                cinemaID: '',
                cost: '',
                hallID: '',
                id: '',
                movieID: '',
                premierTime: '',
            },
            scheduleID: '',
        });
        extractedTicketDataMap.forEach((value, key) => {
            this.state[this.state.length - 1][key] = value;
        });
    }

    /**
     * Get ticket list.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getTicketList() {
        const ticketModel = new TicketModel();
        const response = await ticketModel.getTicketList();

        if (response.ok) {
            const ticketList = await response.json();
            for (const ticket of ticketList) {
                this._addTicket(ticket);
            }
            if (!this.state.length) {
                throw new Error(Errors.ListIsEmpty);
            }

            return this.state;
        }

        throw new Error(Errors.FailedToGetTicketList);
    }
}
