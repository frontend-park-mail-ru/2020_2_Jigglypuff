import Component from '../component.js';
import template from './userBlock.hbs';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import Routes from '../../consts/Routes';

/**
 * @class
 * User block component
 */
export default class UserBlock extends Component {
    /**
     * Create a user block
     * @param context - user context
     * */
    constructor(context) {
        super(context);
        this.template = template;

        this.StandartButton = new StandardButton({
            buttonName: 'Войти',
            event: Events.ChangePath,
            url: Routes.Login,
        });
        this.context.StandardButton = this.StandartButton.render();
    }

    onUpdate(data = {}) {

    }
}
