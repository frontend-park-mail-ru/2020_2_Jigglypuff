import Component from 'components/component';
import template from 'profileTickets.hbs';
import ValidationBlock from 'components/baseComponents/validationBlock/validationBlock';

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
        this._template = template;

        let visibility = false;
        if (!this._context.length) {
            visibility = true;
        }
        this._context.Validation = (new ValidationBlock({
            message: 'На данный момент нет актуальных билетов',
            visibility: visibility,
        })).render();
    }
}
