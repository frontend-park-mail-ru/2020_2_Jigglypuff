import Component from 'components/component';
import template from 'components/filter/filter.hbs';
import SelectList from "components/baseComponents/selectList/selectList";
import StandardButton from "components/baseComponents/buttons/standartButton/standardButton";
import Events from "consts/Events";
import EventBus from "services/EventBus";
import Months from "consts/Months";

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

        this._context.dates = [];
        let todayDate = new Date();

        for (let i = 0; i < 4; i++) {
            let buttonName = `${todayDate.getDate()} ${(Months[+todayDate.getMonth()])}`;
            this._context.dates.push((new StandardButton(
                {
                    buttonName: buttonName,
                    event: Events.SubmitFilter,
                    value: `${todayDate.getFullYear()}-${(+todayDate.getMonth() + 1) < 9 ? '0' : ''}${(+todayDate.getMonth() + 1)}-${(todayDate.getDate()) < 9 ? '0' : ''}${todayDate.getDate()}`,
                }
            )).render());
            todayDate.setDate(todayDate.getDate() + 1);
        }
    }

    _onSubmitFilter(data) {
        let cinemaID = document.getElementById('cinemaList').value;
        let date = data.value;


        EventBus.emit(Events.UpdateMovieList, {
            cinemaID: cinemaID,
            date: date,
        });
    }

}
