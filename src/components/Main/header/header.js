import Component from 'components/component';
import template from 'components/Main/header/header.hbs';
import UserBlock from 'components/Main/userBlock/userBlock';
import headerItems from 'consts/HeaderItems';
import Events from 'consts/Events';
import EventBus from 'services/EventBus';

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

        EventBus.on(Events.UpdateHeader, this._onUpdateHeader.bind(this));

        this._context.headerItems = headerItems;

        this._UserBlock = new UserBlock(this._context.userBlockContext);
        this._context.UserBlock = this._UserBlock.render();
    }

    /**
     * Method that handles updating header
     * @param {Object} userData - header context
     * */
    _onUpdateHeader(userData = {}) {
        const userBlock = document.querySelector('.header__navbar-userblock');
        this._UserBlock.hide();
        this._UserBlock = new UserBlock(userData);
        userBlock.innerHTML = this._UserBlock.render();
    }
}
