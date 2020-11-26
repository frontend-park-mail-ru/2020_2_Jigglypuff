import Component from '../component.js';
import template from './header.hbs';
import UserBlock from '../userBlock/userBlock';
import headerItems from '../../consts/HeaderItems';
import Events from "../../consts/Events";
import EventBus from "../../services/EventBus";
import Routes from "../../consts/Routes";

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
        this._template = template;

        if (!this._isRendered) {
            EventBus.on(Events.UpdateHeader, this._onUpdateHeader.bind(this));
            this._isRendered = true;
        }

        this._context.headerItems = headerItems;
        this._context.UserBlock = (new UserBlock(this._context.userBlockContext)).render();
    }

    /**
     * Method that handles updating header
     * @param {Object} userData - header context
     * */
    _onUpdateHeader(userData = {}) {
        let userBlock = document.querySelector('.header__navbar-userblock');
        userBlock.innerHTML = (new UserBlock(userData)).render();
    }
}
