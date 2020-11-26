import Component from 'components/component';
import template from 'components/baseComponents/validationBlock/validationBlock.hbs';

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
