import Component from '../../../component.js';
import template from './scheduleButton.hbs';

/**
 * Schedule button component
 * @class
 */
export default class ScheduleButton extends Component {
    /**
     * Create a schedule button
     * @constructor
     * @param {Object} context - schedule button context
     * */
    constructor(context) {
        super(context);
        this._template = template;
    }
}
