import Component from '../component.js';
import template from './loginContent.hbs';
import TextInput from '../baseComponents/textInput/textInput';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import LoginItems from '../../consts/LoginItems';
import Events from '../../consts/Events';
import ValidationBlock from '../baseComponents/validationBlock/validationBlock';
import Routes from '../../consts/Routes';

/**
 * Login content component
 * @class
 */
export default class LoginContent extends Component {
    /**
     * Create a header
     * @constructor
     * @param {Object} context - login content context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;
        this.context.input = [];

        for (const i in LoginItems) {
            if (Object.prototype.hasOwnProperty.call(LoginItems, i)) {
                this.context.input.push((new TextInput(LoginItems[i])).render());
            }
        }

        this.context.RegisterPath = Routes.Register;
        this.context.RegisterEvent = Events.ChangePath;

        this.context.Validation = (new ValidationBlock({
            message: 'Пожалуйста, загрузите верный формат аватара',
        })).render();

        this.context.StandardButton = (new StandardButton({
            buttonName: 'Войти',
            event: Events.LoginSubmit,
        })).render();
    }
}
