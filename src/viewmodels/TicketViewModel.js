import Errors from 'consts/Errors';
import TicketModel from 'models/TicketModel';
import Extractor from 'utils/Extractor';

/** Class that contains Ticket ViewModel */
export default class TicketViewModel {
    /**
     * Represents TicketViewModel constructor
     */
    constructor() {
        this.state = {
            hallID: '',
            id: '',
            login: '',
            placeField: {
                place: '',
                row: '',
            },
            placeFields: [],
            schedule: {
                cinemaID: '',
                cost: '',
                hallID: '',
                id: '',
                movieID: '',
                premierTime: '',
            },
            scheduleID: '',
        };
        this.buyTicketCommand = {exec: () => this.buyTicket()};
        this.getTicketcommand = {exec: () => this.getTicket()};
    }

    /**
     * Buy ticket.
     * @return {Promise<JSON>}
     */
    async buyTicket() {
        const ticketModel = new TicketModel();

        ticketModel.login = this.state.login;
        ticketModel.placeFields = this.state.placeFields;
        ticketModel.scheduleID = Number(this.state.scheduleID);

        return ticketModel.buyTicket();
    }

    /**
     * Get user ticket.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getTicket() {
        const ticketModel = new TicketModel();

        ticketModel.id = this.state.id;
        const response = await ticketModel.getTicket();

        if (response.ok) {
            const extractedTicketDataMap = Extractor.extractTicketDataFromModel(ticketModel);
            extractedTicketDataMap.forEach((value, key) => {
                this.state[key] = value;
            });

            return this.state;
        }

        throw new Error(Errors.FailedToGetTicket);
    }
}
