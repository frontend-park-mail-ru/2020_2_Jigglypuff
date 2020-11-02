import Component from '../../../component.js';
import template from './standardButton.hbs';

/**
 * Button component
 * @class
 */
export default class StandardButton extends Component {
    /**
     * Create a button
     * @param {Object} context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
