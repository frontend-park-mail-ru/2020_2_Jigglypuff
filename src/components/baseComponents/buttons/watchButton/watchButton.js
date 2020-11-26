import Component from 'components/component';
import template from 'components/baseComponents/buttons/watchButton/watchButton.hbs';

/**
 * Watch Button component
 * @class
 */
export default class WatchButton extends Component {
    /**
     * Create the watch button
     * @constructor
     * @param {Object} context - watch button context
     * */
    constructor(context) {
        super(context);
        this._template = template;
    }
}
