import Component from '../component.js';
import template from './hallLayout.hbs';
import ScheduleButton from '../baseComponents/buttons/scheduleButton/scheduleButton';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import SeatButton from '../baseComponents/buttons/seatButton/seatButton';
import Events from '../../consts/Events';
import EventBus from '../../services/EventBus';
import Routes from '../../consts/Routes';

/**
 * @class
 * Image input component
 */
export default class HallLayout extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;

        EventBus.on(Events.TicketSelect, this.onUpdate.bind(this));

        this.context.hallLayout = [];

        for (let i in this.context.hall) {
            let rowSeats = [];
            let rowNum = this.context.hall[i][0].row;
            for (let j in this.context.hall[i]) {
                rowSeats.push((new SeatButton({
                    buttonName: this.context.hall[i][j].place,
                    event: Events.TicketSelect,
                    isOccupied: Boolean(this.context.hall[i][j].isOccupied),
                    place: this.context.hall[i][j].place,
                    row: this.context.hall[i][j].row,
                    sessionID: this.context.sessionID,
                })).render());
            }
            this.context.hallLayout.push({rowNumber: rowNum, row: rowSeats});
        }

        this.context.StandardButton = (new StandardButton({buttonName: 'Купить билет', event: Events.TicketsBuy}).render());
    }

    onUpdate(data) {

        if (data.target.classList.contains('button-seat-occupied')) {
            return;
        }

        let hallPlaces = document.getElementsByClassName('button-seat');


        for (let i in hallPlaces) {

            if (hallPlaces.length - 1 === +i) {
                break;
            }

            let hallPlacesClassList = hallPlaces[i].classList;
            let hallPlacesDataset = hallPlaces[i].dataset;

            if (!hallPlacesClassList.contains('button-seat-occupied') && hallPlacesClassList.contains('button-seat-selected')) {
                console.log(data);
                console.log(hallPlacesDataset);


                hallPlacesClassList.remove('button-seat-selected');

            } else if (!hallPlacesClassList.contains('button-seat-selected')) {
                if (data.place !== hallPlacesDataset.place || data.row !== hallPlacesDataset.row) {
                    hallPlacesClassList.remove('button-seat-selected');
                } else {
                    hallPlacesClassList.add('button-seat-selected');
                }
            }
        }

    }
}
