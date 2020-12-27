import Component from 'components/component';
import template from 'components/Profile/profileContent/profileContent.hbs';
import ProfileEdit from 'components/Profile/profileEdit/profileEdit';
import ProfileTickets from 'components/Profile/profileTickets/profileTickets';
import Routes from 'consts/Routes';
import Events from 'consts/Events';
import ProfileNavigation from 'components/Profile/profileNavigation/profileNavigation';
import EventBus from 'services/EventBus';

/**
 * Profile content component
 * @class
 */
export default class ProfileContent extends Component {
    /**
     * Create a profile content component
     * @constructor
     * @param {Object} context - profile content context
     * */
    constructor(context = {}) {
        super(context);
        this._template = template;

        this._context.LogoutPath = Routes.Logout;
        this._context.LogoutEvent = Events.Logout;

        this._onChangeBlockHandler = this._onChangeBlock.bind(this);
        EventBus.on(Events.ChangeProfileBlock, this._onChangeBlockHandler);

        this._context.ProfileEdit = (new ProfileEdit(this._context.profileEdit)).render();
        this._context.ProfileNavigation = (new ProfileNavigation({blockID: this._context.blockID})).render();
        this._context.profileTickets.profileActualTickets.name = 'Текущие заказы';
        this._context.ProfileActualTickets = (new ProfileTickets(this._context.profileTickets.profileActualTickets)).render();
        this._context.profileTickets.profileHistoryTickets.name = 'История заказов';
        this._context.ProfileHistoryTickets = (new ProfileTickets(this._context.profileTickets.profileHistoryTickets)).render();
    }

    /**
     * @param {Object} data
     * */
    _onChangeBlock(data) {
        for (const i of document.getElementsByClassName('profile-navigation__item')) {
            i.classList.remove('profile-navigation__item_enabled');
        }
        data.target.classList.add('profile-navigation__item_enabled');

        const blockID = data.target.dataset.id;

        for (const i of document.querySelectorAll('.navigation-item')) {
            i.style.display = 'none';
            if (i.dataset.id === blockID) {
                i.style.display = 'block';
            }
        }
    }

    /**
     * @return {string}
     * */
    render() {
        const block = document.createElement('div');
        block.innerHTML = this._template(this._context);
        const blockID = block.querySelector('.profile-navigation__item_enabled').dataset.id;

        for (const i of block.querySelectorAll('.navigation-item')) {
            i.style.display = 'none';
            if (i.dataset.id === blockID) {
                i.style.display = 'block';
            }
        }

        return block.innerHTML;
    }

    /**
     *
     * */
    off() {
        EventBus.off(Events.ChangeProfileBlock, this._onChangeBlockHandler);
    }
}
