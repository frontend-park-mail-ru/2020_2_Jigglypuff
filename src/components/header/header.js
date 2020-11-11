import Component from '../component.js';
import template from './header.hbs';
import UserBlock from '../userBlock/userBlock';
import headerItems from '../../consts/HeaderItems';
import SeatButton from '../baseComponents/buttons/seatButton/seatButton';
import BaseViewModel from '../../viewmodels/BaseViewModel';
import Routes from '../../consts/Routes';

/**
 * @class
 * Header component
 */
export default class Header extends Component {
    /**
     * Create a header
     * @param context - header context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;

        this.context.headerItems = headerItems;
        this.UserBlock = new UserBlock(this.context.userBlockContext);
        this.context.UserBlock = this.UserBlock.render();
    }


}
