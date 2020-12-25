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
export default class DropProfileNavigation extends Component {
    /**
     * Create a user block
     * @constructor
     * @param {Object} context - user context
     * */
    constructor(context) {
        super(context);
        this._template = template;

    }
}
