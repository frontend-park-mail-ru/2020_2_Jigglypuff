import Component from '../../component.js';
import template from './textInput.hbs';

/**
 * Text input component
 * @class
 */
export default class TextInput extends Component {
    /**
     * Create a text input
     * @constructor
     * @param {Object} context - text input context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
