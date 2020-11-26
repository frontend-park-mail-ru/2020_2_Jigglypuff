import Component from 'components/component';
import template from 'components/footer/footer.hbs';

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
        this._template = template;
    }
}
