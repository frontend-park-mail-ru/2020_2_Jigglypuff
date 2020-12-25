import Component from 'components/component';
import template from 'components/BaseComponents/buttons/transparentButton/ticketButton.hbs';

/**
 * Button component
 * @class
 */
export default class TransparentButton extends Component {
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
