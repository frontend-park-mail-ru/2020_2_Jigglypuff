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
        this.template = template;

        let Cinemas = [];
        console.log(this.context);
        for (let i in this.context) {
            Cinemas.push((new CinemaCard(this.context[i])).render());
        }
        this.context.Cinemas = Cinemas;

    }
}
