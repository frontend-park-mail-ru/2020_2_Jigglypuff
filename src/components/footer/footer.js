import Component from '../component.js';
import template from './footer.hbs';
import EventBus from '../../services/EventBus.js';

/**
 * @class
 * Header component
 */
export default class Footer extends Component {
    /**
     * Create a header
     * @param context - header context
     * @param parent
     * */
    constructor(context, parent) {
        super(context, parent);
        this.template = template;
    }

    onUpdate(data = {}) {
    }
}
