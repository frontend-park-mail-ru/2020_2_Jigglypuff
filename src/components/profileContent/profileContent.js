import Component from 'components/component';
import template from 'components/profileContent/profileContent.hbs';
import ProfileEdit from 'components/profileEdit/profileEdit';
import ProfileTickets from 'components/profileTickets/profileTickets';
import Routes from 'consts/Routes';
import Events from 'consts/Events';

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

        console.log(this._context);

        this._context.ProfileEdit = (new ProfileEdit(this._context.profileEdit)).render();
        this._context.profileTickets.profileActualTickets.name = 'Актуальные заказы';
        this._context.ProfileActualTickets = (new ProfileTickets(this._context.profileTickets.profileActualTickets)).render();
        this._context.profileTickets.profileHistoryTickets.name = 'История заказов';
        this._context.ProfileHistoryTickets = (new ProfileTickets(this._context.profileTickets.profileHistoryTickets)).render();
    }
}
