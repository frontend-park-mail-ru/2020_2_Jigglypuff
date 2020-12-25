import Component from 'components/component';
import template from 'components/Main/userBlock/userBlock.hbs';
import Events from 'consts/Events';
import Routes from 'consts/Routes';
import TransparentButton from "components/BaseComponents/buttons/transparentButton/ticketButton";
import Avatar from "components/BaseComponents/avatar/avatar";
import EventBus from "services/EventBus";

/**
 * User block component
 * @class
 */
export default class UserBlock extends Component {
    /**
     * Create a user block
     * @constructor
     * @param {Object} context - user context
     * */
    constructor(context) {
        super(context);
        this._template = template;
        this._dropProfileNavigationHandler = this.dropProfileNavigation.bind(this);
        EventBus.on(Events.DropProfileNavigation, this._dropProfileNavigationHandler);

        this._context.ProfilePath = Routes.ProfilePage;
        this._context.ProfileEvent = Events.ChangePath;

        this._context.RegisterPath = Routes.Register;
        this._context.RegisterEvent = Events.ChangePath;
        this._context.Avatar = (new Avatar({pathToAvatar: this._context.pathToAvatar})).render();

        this._context.StandardButton = (new TransparentButton({
            buttonName: 'Войти',
            event: Events.ChangePath,
            url: Routes.Login,
        })).render();
    }

    dropProfileNavigation() {

    }
}
