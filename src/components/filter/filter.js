import Component from 'components/component';
import template from 'components/filter/filter.hbs';
import SelectList from 'components/baseComponents/selectList/selectList';
import StandardButton from 'components/baseComponents/buttons/standartButton/standardButton';
import Events from 'consts/Events';
import EventBus from 'services/EventBus';
import Months from 'consts/Months';

/**
 * Filter component
 * @class
 */
export default class Filter extends Component {
    /**
     * Create a filter
     * @constructor
     * @param {Object} context - filter context
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
                id: 'cinemaList',
            },
        )).render();

        this._context.dates = [];
        const todayDate = new Date();

        for (let i = 0; i < 4; i++) {
            const day = todayDate.getDate();
            const month = +todayDate.getMonth() + 1;
            const year = todayDate.getFullYear();

            const buttonName = `${day} ${(Months[month-1])}`;
            this._context.dates.push((new StandardButton(
                {
                    buttonName: buttonName,
                    event: Events.SubmitFilter,
                    value: `${year}-${month-1 < 9 ? '0' : ''}${month}-${day < 9 ? '0' : ''}${day}`,
                },
            )).render());
            todayDate.setDate(todayDate.getDate() + 1);
        }
    }

    /**
     * Method that handles filter submit
     * @param {Object} data - filter data
     * */
    _onSubmitFilter(data) {
        const cinemaID = document.getElementById('cinemaList').value;
        const cinemaName = document.getElementById('cinemaList').options[cinemaID-1].innerHTML;
        const date = data.value;

        if (this._context.target === 'cinema') {
            EventBus.emit(Events.UpdateMovieList, {
                cinemaID: cinemaID,
                date: date,
            });
        } else if (this._context.target === 'schedule') {
            EventBus.emit(Events.UpdateSchedule, {
                cinemaName: cinemaName,
                cinemaID: cinemaID,
                date: date,
            });
        }
    }
}
