import Component from '../component.js';
import template from './footer.hbs';

/**
 * Footer component
 * @class
 */
export default class Footer extends Component {
    /**
     * Create a footer
     * @constructor
     * @param {Object} context - footer context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;
    }
}
