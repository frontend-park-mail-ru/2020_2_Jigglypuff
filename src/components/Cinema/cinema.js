import Component from '../component.js';
import template from './cinema.hbs';
import CinemaCard from '../cinemaCard/cinemaCard';
import Routes from '../../consts/Routes';

/**
 * @class
 * Image input component
 */
export default class Cinema extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;



        this.context.cinema = ((new CinemaCard(this.context)).render());
    }
}
