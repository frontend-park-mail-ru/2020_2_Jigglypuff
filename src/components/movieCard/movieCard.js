import Component from '../component.js';
import template from './movieCard.hbs';
import ScheduleButton from '../baseComponents/buttons/scheduleButton/scheduleButton';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import Routes from '../../consts/Routes';
import Events from '../../consts/Events';

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
        this.template = template;

        this.context.path = Routes.MoviePage.replace(':id', this.context.id);
        this.context.event = Events.ChangePath;
        this.context.pathToAvatar = Routes.Host + this.context.pathToAvatar;

        this.context.ScheduleButtons = [];

        for (const i in this.context.scheduleContext) {
            if (Object.prototype.hasOwnProperty.call(this.context.scheduleContext, i)) {
                this.context.ScheduleButtons.push((new ScheduleButton(
                    {
                        scheduleTime: this.context.scheduleContext[i].time,
                        schedulePrice: this.context.scheduleContext[i].cost,
                        id: this.context.scheduleContext[i].id,
                        event: Events.ChangePath,
                        url: Routes.ScheduleID.replace(':id', this.context.scheduleContext[i].id),
                    },
                )).render(),
                );
            }
        }
        this.context.StandardButton = (new StandardButton({
            buttonName: 'О фильме',
            event: Events.ChangePath,
            url: this.context.path,
        }).render());
    }
}
