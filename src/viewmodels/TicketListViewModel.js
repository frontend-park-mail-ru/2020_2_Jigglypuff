import Errors from 'consts/Errors';
import TicketModel from 'models/TicketModel';
import Extractor from 'utils/Extractor';

/** Class that contains TicketList ViewModel */
export default class TicketViewModel {
    /**
     * Represents TicketViewModel constructor
     */
    constructor() {
        this.state = [];
        this.stateActualTicketList = [];
        this.stateHistoryTicketList = [];
        this.getTicketListCommand = {exec: () => this.getTicketList()};
    }

    /**
     * Add ticket to state array.
     * @param {JSON} ticket
     */
    _addTicket(ticket) {
        const extractedTicketDataMap = Extractor.extractTicketDataFromJSON(ticket);
        this.state.push({
            id: '',
            login: '',
            placeField: {
                place: '',
                row: '',
            },
            qrpath: '',
            schedule: {
                cinemaID: '',
                cost: '',
                date: '',
                hallID: '',
                id: '',
                movieID: '',
                premierTime: '',
                time: '',
            },
            transactionDate: '',
        });
        extractedTicketDataMap.forEach((value, key) => {
            this.state[this.state.length - 1][key] = value;
        });

        this.state[this.state.length - 1]['schedule']['time'] = this.state[this.state.length - 1]['schedule']['premierTime'].replace(/\d{4}-\d{2}-\d{2}T/, '');
        this.state[this.state.length - 1]['schedule']['time'] = this.state[this.state.length - 1]['schedule']['time']
            .replace(this.state[this.state.length - 1]['schedule']['time'].replace(/\d{2}:\d{2}/, ''), '');

        const day = this.state[this.state.length - 1]['schedule']['premierTime'].slice(8, 10);
        const month = this.state[this.state.length - 1]['schedule']['premierTime'].slice(5, 7);
        const year = this.state[this.state.length - 1]['schedule']['premierTime'].slice(0, 4);
        this.state[this.state.length - 1]['schedule']['date'] = `${day}.${month}.${year}`;

        const hours = this.state[this.state.length - 1]['schedule']['time'].replace(/:\d{2}/, '');
        const minutes = +this.state[this.state.length - 1]['schedule']['time'].replace(/\d{2}:/, '') +
            hours * 60;

        const currentDate = new Date();
        const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

        if (!(year < currentDate.getFullYear()) &&
            !(month < currentDate.getMonth()) &&
            !(day < currentDate.getDate()) &&
            !(minutes < currentMinutes)
        ) {
            this.stateActualTicketList.push(this.state[this.state.length - 1]);
        } else {
            this.stateHistoryTicketList.push(this.state[this.state.length - 1]);
        }
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
