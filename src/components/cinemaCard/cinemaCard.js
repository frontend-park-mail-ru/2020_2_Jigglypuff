import Component from '../component.js';
import template from './cinemaCard.hbs';
import ScheduleButton from '../baseComponents/buttons/scheduleButton/scheduleButton';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';

/**
 * @class
 * Image input component
 */
export default class CinemaCard extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
        this.context = {
            address: 'м.Кропоткинская, ул. Остоженка д.5',
            hallCount: 10,
            name: 'Кронверк Синема',
        };
    }
}
