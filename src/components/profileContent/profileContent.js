import Component from '../component.js';
import template from './profileContent.hbs';
import ProfileEdit from '../profileEdit/profileEdit';
import ProfileTickets from '../profileTickets/profileTickets';
import Routes from '../../consts/Routes';
import Events from '../../consts/Events';

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
        this.template = template;

        this.context.LogoutPath = Routes.Logout;
        this.context.LogoutEvent = Events.Logout;

        this.context.ProfileEdit = (new ProfileEdit(this.context.profileEdit)).render();
        this.context.ProfileTickets = (new ProfileTickets(this.context.profileTickets)).render();
    }
}
