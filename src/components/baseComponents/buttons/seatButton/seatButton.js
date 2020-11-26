import Component from '../../../component.js';
import template from './seatButton.hbs';

/**
 * Button seat component
 * @class
 */
export default class SeatButton extends Component {
    /**
     * Create a button seat
     * @constructor
     * @param {Object} context - button seat context
     * */
    constructor(context) {
        super(context);
        this._template = template;
    }
}
