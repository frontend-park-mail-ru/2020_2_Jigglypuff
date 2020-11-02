import Component from '../../../component.js';
import template from './watchButton.hbs';

/**
 * Watch Button component
 * @class
 */
export default class WatchButton extends Component {
    /**
     * Create the watch button
     * @param {Object} context - watch button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
