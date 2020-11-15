import Component from '../component.js';
import template from './profileTickets.hbs';
import ValidationBlock from '../baseComponents/validationBlock/validationBlock';

/**
 * Profile tickets component
 * @class
 */
export default class ProfileTickets extends Component {
    /**
     * Create a profile tickets component
     * @constructor
     * @param {Object} context - profile tickets context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;

        let visibility = false;
        if (!this.context.length) {
            visibility = true;
        }

        this.context.Validation = (new ValidationBlock({
            message: 'На данный момент нет актуальных билетов',
            visibility: visibility,
        })).render();
    }
}
