import Component from '../component.js';
import template from './cinemaList.hbs';
import CinemaCard from '../cinemaCard/cinemaCard';

/**
 * @class
 * Image input component
 */
export default class CinemaList extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.context = {};
        this.template = template;
        // console.log(this.context);

        this.context.Cinemas = [];
        this.context.Cinemas.push((new CinemaCard()).render());
        this.context.Cinemas.push((new CinemaCard()).render());

    }
}
