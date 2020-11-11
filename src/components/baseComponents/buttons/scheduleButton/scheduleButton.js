import Component from '../../../component.js';
import template from './scheduleButton.hbs';

/**
 * @class
 * Button component
 */
export default class ScheduleButton extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
