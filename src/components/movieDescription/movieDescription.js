import Component from 'components/component';
import template from 'components/movieDescription/movieDescription.hbs';
import StandardButton from 'components/baseComponents/buttons/standartButton/standardButton';
import Events from 'consts/Events';

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
        this._template = template;

        this._context.StandardButton = (new StandardButton({
            buttonName: 'Оценить',
            event: Events.MovieRate,
        }).render());
    }
}
