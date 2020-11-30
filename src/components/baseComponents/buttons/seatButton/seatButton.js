import Component from 'components/component';
import template from 'components/baseComponents/buttons/seatButton/seatButton.hbs';

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
