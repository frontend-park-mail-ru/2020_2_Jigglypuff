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
        this._template = template;

        const Cinemas = [];
        for (const i in this._context) {
            if (Object.prototype.hasOwnProperty.call(this._context, i)) {
                Cinemas.push((new CinemaCard(this._context[i])).render());
            }
        }
        this._context.Cinemas = Cinemas;
    }
}
