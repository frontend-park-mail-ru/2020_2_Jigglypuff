import Component from 'components/component';
import template from 'components/Main/header/header.hbs';
import UserBlock from 'components/Main/userBlock/userBlock';
import headerItems from 'consts/HeaderItems';
import Events from 'consts/Events';
import EventBus from 'services/EventBus';
import Routes from 'consts/Routes';

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

        this._onUpdateHeaderHandler = this._onUpdateHeader.bind(this);
        this._onGoToProfileBlockHandler = this._onGoToProfileBlock.bind(this);

        EventBus.on(Events.UpdateHeader, this._onUpdateHeaderHandler);
        EventBus.on(Events.GoToProfileBlock, this._onGoToProfileBlockHandler);

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
        this._context.userBlockContext = {...this._context.userBlockContext, ...userData};
        this._UserBlock = new UserBlock(this._context.userBlockContext);
        userBlock.innerHTML = this._UserBlock.render();
    }

    /**
     * @param {Object} data
     * */
    _onGoToProfileBlock(data) {
        if (window.location.pathname !== Routes.ProfilePage) {
            EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage, blockID: data.id});
        } else {
            for (const i of document.getElementsByClassName('profile-navigation__item')) {
                if (i.dataset.id === data.id) {
                    data.target = i;
                    break;
                }
            }
            EventBus.emit(Events.ChangeProfileBlock, data);
        }
    }

    /**
     *
     * */
    off() {
        EventBus.off(Events.UpdateHeader, this._onUpdateHeaderHandler);
        EventBus.off(Events.GoToProfileBlock, this._onGoToProfileBlockHandler);
        this._UserBlock.off();
    }
}
