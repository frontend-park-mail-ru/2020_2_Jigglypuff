import Component from '../../../component.js';
import template from './seatButton.hbs';
import EventBus from '../../../../services/EventBus';
import Events from '../../../../consts/Events.js';

/**
 * @class
 * Button component
 */
export default class SeatButton extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;

    }
}
