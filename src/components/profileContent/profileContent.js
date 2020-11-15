import Component from '../component.js';
import template from './profileContent.hbs';
import ProfileEdit from '../profileEdit/profileEdit';
import ProfileTickets from '../profileTickets/profileTickets';

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

        this.context.ProfileEdit = (new ProfileEdit(this.context.profileEdit)).render();
        this.context.ProfileTickets = (new ProfileTickets(this.context.profileTickets)).render();
    }
}
