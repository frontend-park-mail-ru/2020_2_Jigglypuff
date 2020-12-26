import Component from 'components/component';
import template from 'components/BaseComponents/buttons/ticketButton/ticketButton.hbs';

/**
 * Button component
 * @class
 */
export default class TicketButton extends Component {
    /**
     * Create a button
     * @constructor
     * @param {Object} context - button context
     * */
    constructor(context) {
        super(context);
        this._template = template;
    }
}
