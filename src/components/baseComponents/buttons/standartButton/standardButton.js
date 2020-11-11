import Component from '../../../component.js';
import template from './standardButton.hbs';

/**
 * @class
 * Button component
 */
export default class StandardButton extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
