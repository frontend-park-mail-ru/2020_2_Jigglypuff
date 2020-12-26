import Component from 'components/component';
import template from 'components/BaseComponents/textInput/textInput.hbs';

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
        this._template = template;
    }
}
