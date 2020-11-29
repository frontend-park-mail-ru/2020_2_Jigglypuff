import Component from 'components/component';
import template from 'components/movieSchedule/movieSchedule.hbs';
import ScheduleButton from 'components/baseComponents/buttons/scheduleButton/scheduleButton';
import Routes from 'consts/Routes';
import Events from 'consts/Events';

/**
 * Movie card component
 * @class
 */
export default class MovieSchedule extends Component {
    /**
     * Create a movie card
     * @constructor
     * @param {Object} context - movie card context
     * */
    constructor(context) {
        super(context);
        this._template = template;

        if (!Object.hasOwnProperty.call(this._context, 'sessions')) {
            return;
        }

        const scheduleButtons = [];
        for (const session of this._context.sessions) {
            scheduleButtons.push((new ScheduleButton(
                {
                    scheduleTime: session.time,
                    schedulePrice: session.cost,
                    id: session.id,
                    event: Events.ChangePath,
                    url: Routes.ScheduleID.replace(':id', session.id),
                },
            )).render(),
            );
        }

        this._context.date = this._context.sessions[0].date;
        this._context.ScheduleButtons = scheduleButtons;
    }
}
