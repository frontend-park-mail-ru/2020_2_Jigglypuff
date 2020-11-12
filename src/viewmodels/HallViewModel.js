import Extractor from '../utils/Extractor';
import Errors from '../consts/Errors';
import HallModel from '../models/HallModel';
import TicketModel from '../models/TicketModel';

/** Class that contains HallList ViewModel */
export default class HallViewModel {
    /**
     * Represents Hall ViewModel constructor
     */
    constructor() {
        this._hallModel = new HallModel();
        this._ticketModel = new TicketModel();
        this.state = {
            hallID: '',
            scheduleID: '',
        };
        this.stateHallStructure = {
            id: '',
            placeAmount: '',
            placeConfig: '',
        };
        this.stateOccupiedPlaces = [];
        this.statePlaces = [];
        this.getHallStructureCommand = {exec: (id) => this.getHallStructure(id)};
        this.getOccupiedPlacesCommand = {exec: (id) => this.getOccupiedPlaces(id)};
        this.getPlacesCommand = {exec: () => this.getPlaces()};
    }

    /**
     * Add ticket to state array.
     * @param {JSON} ticket
     */
    _addSchedule(ticket) {
        const extractedScheduleDataMap = Extractor.extractTicketScheduleFromJSON(ticket);
        this.stateOccupiedPlaces.push({
            place: '',
            row: '',
        });
        extractedScheduleDataMap.forEach((value, key) => {
            this.stateOccupiedPlaces[this.stateOccupiedPlaces.length - 1][key] = value;
        });
    }

    /**
     * Get hall structure.
     * @param {int} hallID
     * @return {Promise<Error>|Promise<Object>}
     */
    async getHallStructure(hallID) {
        this._hallModel.id = Number(hallID);
        const response = await this._hallModel.getHall();

        if (response.ok) {
            const extractedHallDataMap = Extractor.extractHallData(this._hallModel);
            extractedHallDataMap.forEach((value, key) => {
                this.stateHallStructure[key] = value;
            });

            return this.stateHallStructure;
        }

        throw new Error(Errors.FailedToGetHall);
    }

    /**
     * Get hall occupied places.
     * @param {int} ticketID
     * @return {Promise<Error>|Promise<Object>}
     */
    async getOccupiedPlaces(ticketID) {
        this._ticketModel.scheduleID = Number(this.state.scheduleID);
        const response = await this._ticketModel.getScheduleHallTicketList();

        if (response.ok) {
            const ticketScheduleList = await response.json();
            for (const ticketSchedule of ticketScheduleList) {
                this._addSchedule(ticketSchedule);
            }

            return this.stateOccupiedPlaces;
        }

        throw new Error(Errors.FailedToGetTicketScheduleList);
    }

    /**
     * Get hall places.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getPlaces() {
        const hallStructure = await this.getHallStructure(this.state.hallID);

        let currentRow = 0;
        (hallStructure.placeConfig['Levels']).forEach((place) => {
            if (currentRow !== place.Row) {
                currentRow = place.Row;
                this.statePlaces.push([]);
            }
            this.statePlaces[place.Row - 1].push({
                isOccupied: false,
                place: place.Place,
                row: place.Row,
            });
        });

        const occupiedPlacesArray = await this.getOccupiedPlaces(this.state.scheduleID);
        occupiedPlacesArray.forEach((occupiedPlace) => {
            this.statePlaces[occupiedPlace.row - 1][occupiedPlace.place - 1].isOccupied = true;
        });

        return this.statePlaces;
    }
}
