import Component from 'components/component';
import template from 'standardButton.hbs';

/**
 * Button component
 * @class
 */
export default class StandardButton extends Component {
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
