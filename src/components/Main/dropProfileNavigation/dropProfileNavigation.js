import Component from 'components/component';
import template from 'components/Main/dropProfileNavigation/dropProfileNavigation.hbs';
import Avatar from "components/BaseComponents/avatar/avatar";
import ProfileNavigationItems from "consts/ProfileNavigationItems";
import EventBus from "services/EventBus";

/**
 * User block component
 * @class
 */
export default class DropProfileNavigation extends Component {
    /**
     * Create a user block
     * @constructor
     * @param {Object} context - user context
     * */
    constructor(context) {
        super(context);
        this._template = template;

        this._context.Avatar = (new Avatar({pathToAvatar: this._context.pathToAvatar})).render();

        this._context = {...this._context, ...ProfileNavigationItems};
    }
}
