import Component from '../component.js';
import template from './cinema.hbs';
import CinemaCard from '../cinemaCard/cinemaCard';

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
        this.template = template;

        this.context.cinema = ((new CinemaCard(this.context)).render());
    }
}