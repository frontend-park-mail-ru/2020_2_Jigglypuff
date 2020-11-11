import Component from '../../../component.js';
import template from './watchButton.hbs';

/**
 * @class
 * Watch Button component
 */
export default class WatchButton extends Component {
    /**
     * Create the watch button
     * @param context - watch button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
