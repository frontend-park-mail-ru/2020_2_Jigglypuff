import Component from 'components/component';
import template from 'components/movieCard/movieCard.hbs';
import ScheduleButton from 'components/baseComponents/buttons/scheduleButton/scheduleButton';
import StandardButton from 'components/baseComponents/buttons/standartButton/standardButton';
import Routes from 'consts/Routes';
import Events from 'consts/Events';

/**
 * Movie card component
 * @class
 */
export default class MovieCard extends Component {
    /**
     * Create a movie card
     * @constructor
     * @param {Object} context - movie card context
     * */
    constructor(context) {
        super(context);
        this._template = template;

        this._context.path = Routes.MoviePage.replace(':id', this._context.id);
        this._context.event = Events.ChangePath;
        this._context.pathToAvatar = Routes.Host + this._context.pathToAvatar;

        this._context.ScheduleButtons = [];

        for (const i in this._context.scheduleContext) {
            if (Object.prototype.hasOwnProperty.call(this._context.scheduleContext, i)) {
                this._context.ScheduleButtons.push((new ScheduleButton(
                    {
                        scheduleTime: this._context.scheduleContext[i].time,
                        schedulePrice: this._context.scheduleContext[i].cost,
                        id: this._context.scheduleContext[i].id,
                        event: Events.ChangePath,
                        url: Routes.ScheduleID.replace(':id', this._context.scheduleContext[i].id),
                    },
                )).render(),
                );
            }
        }
        this._context.StandardButton = (new StandardButton({
            buttonName: 'О фильме',
            event: Events.ChangePath,
            url: this._context.path,
        }).render());
    }
}
