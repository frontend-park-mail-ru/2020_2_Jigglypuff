import Component from '../component.js';
import template from './userBlock.hbs';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import Events from '../../consts/Events';
import Routes from '../../consts/Routes';

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
        this.template = template;

        this.context.ProfilePath = Routes.ProfilePage;
        this.context.ProfileEvent = Events.ChangePath;

        this.context.RegisterPath = Routes.Register;
        this.context.RegisterEvent = Events.ChangePath;

        this.StandartButton = new StandardButton({
            buttonName: 'Войти',
            event: Events.ChangePath,
            url: Routes.Login,
        });
        this.context.StandardButton = this.StandartButton.render();
    }
}
