import Component from '../../component.js';
import template from './validationBlock.hbs';

/**
 * Validation block component
 * @class
 */
export default class ValidationBlock extends Component {
    /**
     * Create a validation block
     * @constructor
     * @param {Object} context - validation block context
     * */
    constructor(context) {
        super(context);
        this._template = template;
    }
}
