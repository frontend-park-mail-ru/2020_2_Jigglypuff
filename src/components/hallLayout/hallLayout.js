import Component from '../component.js';
import template from './hallLayout.hbs';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import SeatButton from '../baseComponents/buttons/seatButton/seatButton';
import Events from '../../consts/Events';
import ValidationBlock from '../baseComponents/validationBlock/validationBlock';

/**
 * Hall layout component
 * @class
 */
export default class HallLayout extends Component {
    /**
     * Create a hall layout
     * @constructor
     * @param {Object} context - hall layout context
     * */
    constructor(context) {
        super(context);
        this.template = template;

        this.context.hallLayout = [];

        let visibility = true;
        for (const i in this.context.hall) {
            if (Object.prototype.hasOwnProperty.call(this.context.hall, i)) {
                visibility = false;

                const rowSeats = [];
                const rowNum = this.context.hall[i][0].row;
                for (const j in this.context.hall[i]) {
                    if (Object.prototype.hasOwnProperty.call(this.context.hall[i], j)) {
                        rowSeats.push((new SeatButton({
                            buttonName: this.context.hall[i][j].place,
                            event: Events.TicketSelect,
                            isOccupied: Boolean(this.context.hall[i][j].isOccupied),
                            place: this.context.hall[i][j].place,
                            row: this.context.hall[i][j].row,
                            sessionID: this.context.sessionID,
                        })).render());
                    }
                }
                this.context.hallLayout.push({rowNumber: rowNum, row: rowSeats});
            }
        }

        this.context.Validation = (new ValidationBlock({
            message: 'Выберите билет для покупки',
            visibility: visibility,
        })).render();

        this.context.StandardButton = (new StandardButton({
            buttonName: 'Купить билет',
            event: Events.TicketsBuy,
        }).render());
    }
}
