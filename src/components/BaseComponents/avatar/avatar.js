import Component from 'components/component';
import template from 'components/BaseComponents/avatar/avatar.hbs';

/**
 * Image input component
 * @class
 */
export default class Avatar extends Component {
    /**
     * Create an image input
     * @constructor
     * @param {Object} context - image input context
     * */
    constructor(context) {
        super(context);
        this._template = template;
    }

}
