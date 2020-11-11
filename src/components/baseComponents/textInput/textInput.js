import Component from '../../component.js';
import template from './textInput.hbs';

/**
 * @class
 * Button component
 */
export default class TextInput extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
