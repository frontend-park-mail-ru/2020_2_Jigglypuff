import Component from '../component.js';
import template from './hallLayout.hbs';
import ScheduleButton from '../baseComponents/buttons/scheduleButton/scheduleButton';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import SeatButton from '../baseComponents/buttons/seatButton/seatButton';
import Events from '../../consts/Events';
import EventBus from '../../services/EventBus';
import Routes from '../../consts/Routes';
import ValidationBlock from '../baseComponents/validationBlock/validationBlock';

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

        this.context.hallLayout = [];

        let visibility = true;
        for (let i in this.context.hall) {

            visibility = false;

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

        this.context.Validation = (new ValidationBlock({
            message: 'Выберите билет для покупки',
            visibility: visibility,
        })).render();

        this.context.StandardButton = (new StandardButton({buttonName: 'Купить билет', event: Events.TicketsBuy}).render());
    }

}
