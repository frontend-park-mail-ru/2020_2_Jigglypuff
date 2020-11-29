import Component from 'components/component';
import template from 'components/baseComponents/selectList/selectList.hbs';

/**
 * Image input component
 * @class
 */
export default class SelectList extends Component {
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
