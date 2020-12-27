import Component from 'components/component';
import template from 'components/Profile/profileContent/profileContent.hbs';
import ProfileEdit from 'components/Profile/profileEdit/profileEdit';
import ProfileTickets from 'components/Profile/profileTickets/profileTickets';
import Routes from 'consts/Routes';
import Events from 'consts/Events';
import ProfileNavigation from "components/Profile/profileNavigation/profileNavigation";
import EventBus from "services/EventBus";

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

    _onChangeBlock(data) {
        for (const i of document.getElementsByClassName('profile-navigation__item')) {
            i.classList.remove('profile-navigation__item_enabled');
        }
        data.target.classList.add('profile-navigation__item_enabled');

        document.getElementById('settings').style.display = 'none';
        document.getElementById('current').style.display = 'none';
        document.getElementById('history').style.display = 'none';

        document.getElementById(data.id).style.display = 'block';
    }
}
