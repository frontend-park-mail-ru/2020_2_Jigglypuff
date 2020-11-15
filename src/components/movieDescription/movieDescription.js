import Component from '../component.js';
import template from './movieDescription.hbs';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import Events from '../../consts/Events';

/**
 * Movie description component
 * @class
 */
export default class MovieDescription extends Component {
    /**
     * Create a movie description component
     * @constructor
     * @param {Object} context - movie description context
     * */
    constructor(context) {
        super(context);
        this.template = template;

        this.context.StandardButton = (new StandardButton({
            buttonName: 'Оценить',
            event: Events.MovieRate,
        }).render());
    }
}
