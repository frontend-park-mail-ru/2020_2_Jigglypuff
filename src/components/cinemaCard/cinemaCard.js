import Component from '../component.js';
import template from './cinemaCard.hbs';
import Routes from '../../consts/Routes';

/**
 * Cinema card component
 * @class
 */
export default class CinemaCard extends Component {
    /**
     * Create a cinema card
     * @constructor
     * @param {Object} context - cinema card context
     * */
    constructor(context) {
        super(context);
        this.template = template;

        this.context.pathToAvatar = Routes.Host + this.context.pathToAvatar;
        this.context.cinemaPath = Routes.CinemaPage.replace(':id/', this.context.id);
    }
}
