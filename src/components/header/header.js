import Component from '../component.js';
import template from './header.hbs';
import UserBlock from '../userBlock/userBlock';
import headerItems from '../../consts/HeaderItems';

/**
 * Header component
 * @class
 */
export default class Header extends Component {
    /**
     * Create a header
     * @constructor
     * @param {Object} context - header context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;

        this.context.headerItems = headerItems;
        this.UserBlock = new UserBlock(this.context.userBlockContext);
        this.context.UserBlock = this.UserBlock.render();
    }
}
