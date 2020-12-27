import Component from 'components/component';
import template from 'components/Profile/profileTickets/profileTickets.hbs';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';

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
            message: 'В данном разделе билетов не найдено',
            visibility: visibility,
        })).render();
    }
}
