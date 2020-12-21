import Component from 'components/component';
import template from 'components/hallLayout/hallLayout.hbs';
import StandardButton from 'components/baseComponents/buttons/standartButton/standardButton';
import SeatButton from 'components/baseComponents/buttons/seatButton/seatButton';
import Events from 'consts/Events';
import ValidationBlock from 'components/baseComponents/validationBlock/validationBlock';
import EventBus from "services/EventBus";

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
        this._template = template;
        this._selectedPlaces = 0;

        this._context.hallLayout = [];

        this._onTicketSelectHandler = this.onSelect.bind(this);
        EventBus.on(Events.TicketSelect, this._onTicketSelectHandler);

        let visibility = true;
        for (const i in this._context.hall) {
            if (Object.prototype.hasOwnProperty.call(this._context.hall, i)) {
                visibility = false;

                const rowSeats = [];
                const rowNum = this._context.hall[i][0].row;
                for (const j in this._context.hall[i]) {
                    if (Object.prototype.hasOwnProperty.call(this._context.hall[i], j)) {
                        rowSeats.push((new SeatButton({
                            buttonName: this._context.hall[i][j].place,
                            event: Events.TicketSelect,
                            isOccupied: Boolean(this._context.hall[i][j].isOccupied),
                            place: this._context.hall[i][j].place,
                            row: this._context.hall[i][j].row,
                            sessionID: this._context.sessionID,
                        })).render());
                    }
                }
                this._context.hallLayout.push({rowNumber: rowNum, row: rowSeats});
            }
        }

        this._context.Validation = (new ValidationBlock({
            message: 'Выберите билет для покупки',
            visibility: visibility,
        })).render();

        this._context.StandardButton = (new StandardButton({
            buttonName: 'Купить билет',
            event: Events.TicketsBuy,
        }).render());
    }

    /**
     * Method that handles place selection in the hall
     * @param {Object} data - information about current hall layout
     */
    onSelect(data) {
        const validation = (document.querySelector('.hall-layout')).querySelector('.validation-block');
        if (data.target.classList.contains('button-seat-occupied')) {
            validation.innerHTML = 'Выбранное место занято';
            validation.classList.remove('validation-display-none');
            return;
        }

        validation.classList.add('validation-display-none');

        const hallPlaces = document.getElementsByClassName('button-seat');

        for (const place of hallPlaces) {
            const hallPlacesClassList = place.classList;
            const hallPlacesDataset = place.dataset;

            if (data.place === hallPlacesDataset.place && data.row === hallPlacesDataset.row) {
                if (hallPlacesClassList.contains('button-seat-selected')) {
                    hallPlacesClassList.remove('button-seat-selected');
                    this._selectedPlaces--;
                } else if (!hallPlacesClassList.contains('button-seat-occupied')) {
                    if (this._selectedPlaces >= 6) {
                        validation.innerHTML = 'Выбрано максимальное количество билетов';
                        validation.classList.remove('validation-display-none');
                        return;
                    }
                    hallPlacesClassList.add('button-seat-selected');
                    this._selectedPlaces++;
                }
            }
        }
    }

    hide() {
        EventBus.off(Events.TicketSelect, this._onTicketSelectHandler);
    }
}
