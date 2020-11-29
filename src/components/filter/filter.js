import Component from 'components/component';
import template from 'components/filter/filter.hbs';
import SelectList from "components/baseComponents/selectList/selectList";
import StandardButton from "components/baseComponents/buttons/standartButton/standardButton";
import Events from "consts/Events";
import EventBus from "services/EventBus";

/**
 * Image input component
 * @class
 */
export default class Filter extends Component {
    /**
     * Create an image input
     * @constructor
     * @param {Object} context - image input context
     * */
    constructor(context) {
        super(context);
        this._template = template;

        if (!this._isRendered) {
            EventBus.on(Events.SubmitFilter, this._onSubmitFilter.bind(this));
            this._isRendered = true;
        }

        this._context.SelectCinema = (new SelectList(
            {
                values: this._context.cinemaList,
                label: 'Кинотеатры',
                id: 'cinemaList'
            }
        )).render();
        this._context.SelectDate = (new SelectList(
            {
                values: this._context.cinemaList,
                label: 'Даты'
            }
        )).render();

        this._context.StandardButton = (new StandardButton(
            {
                buttonName: 'Принять',
                event: Events.SubmitFilter,
            }
        )).render();

        this._context.calendar = {
            label: 'Дата',
            id: 'calendarList'
        };
    }

    _onSubmitFilter() {
        let cinemaID = document.getElementById('cinemaList').value;
        let date = document.getElementById('calendarList').value;

        EventBus.emit(Events.UpdateMovieList, {
            cinemaID: cinemaID,
            date: date,
        });
    }

}
