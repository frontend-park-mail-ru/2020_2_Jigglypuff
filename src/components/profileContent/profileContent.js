import Component from '../component.js';
import template from './profileContent.hbs';
import ProfileEdit from '../profileEdit/profileEdit';
import ProfileTickets from '../profileTickets/profileTickets';

/**
 * @class
 * Header component
 */
export default class ProfileContent extends Component {
    /**
     * Create a header
     * @param context - header context
     * @param parent
     * */
    constructor(context = {}, parent = {}) {
        super(context, parent);
        this.template = template;

        this.context.ProfileEdit = (new ProfileEdit(this.context.profileEdit)).render();
        this.context.ProfileTickets = (new ProfileTickets(this.context.profileTickets)).render();
    }

}
