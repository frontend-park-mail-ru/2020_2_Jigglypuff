import Component from '../component.js';
import template from './slider.hbs';
import WatchButton from '../baseComponents/buttons/watchButton/watchButton';
import Events from '../../consts/Events';
import Routes from '../../consts/Routes';

/**
 * Slider component
 * @class
 */
export default class Slider extends Component {
    /**
     * Create a slider
     * @constructor
     * @param {Object} context - slider context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;

        this.context.WatchButton = (new WatchButton({
            buttonName: 'Смотреть',
            url: Routes.MovieList + this.context.id + '/',
            event: Events.ChangePath,
        })).render();
    }
}
