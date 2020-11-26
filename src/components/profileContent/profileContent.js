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

        this._context.ProfileEdit = (new ProfileEdit(this._context.profileEdit)).render();
        this._context.ProfileTickets = (new ProfileTickets(this._context.profileTickets)).render();
    }
}
