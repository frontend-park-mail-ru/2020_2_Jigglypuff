import Component from 'components/component';
import template from 'cinema.hbs';
import CinemaCard from 'components/cinemaCard/cinemaCard';

/**
 * Cinema page component
 * @class
 */
export default class Cinema extends Component {
    /**
     * Create a cinema page
     * @constructor
     * @param {Object} context - cinema page context
     * */
    constructor(context) {
        super(context);
        this._template = template;

        this._context.cinema = ((new CinemaCard(this._context)).render());
    }
}
