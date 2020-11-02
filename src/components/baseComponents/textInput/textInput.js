import Component from '../../component.js';
import template from './textInput.hbs';

/**
 * Text input component
 * @class
 */
export default class TextInput extends Component {
    /**
     * Create the text input
     * @param {Object} context - input context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
