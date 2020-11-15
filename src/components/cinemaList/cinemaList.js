import Component from '../component.js';
import template from './cinemaList.hbs';
import CinemaCard from '../cinemaCard/cinemaCard';

/**
 * Cinema list component
 * @class
 */
export default class CinemaList extends Component {
    /**
     * Create a cinema list
     * @constructor
     * @param {Object} context - cinema list context
     * */
    constructor(context) {
        super(context);
        this.template = template;

        const Cinemas = [];
        for (const i in this.context) {
            if (Object.prototype.hasOwnProperty.call(this.context, i)) {
                Cinemas.push((new CinemaCard(this.context[i])).render());
            }
        }
        this.context.Cinemas = Cinemas;
    }
}
