import Component from '../../component.js';
import template from './validationBlock.hbs';

/**
 * @class
 * Button component
 */
export default class ValidationBlock extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
