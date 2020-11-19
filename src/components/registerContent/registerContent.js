import Component from '../component.js';
import template from './registerContent.hbs';
import RegistrationItems from '../../consts/RegistrationItems';
import TextInput from '../baseComponents/textInput/textInput';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import Events from '../../consts/Events';
import ValidationBlock from '../baseComponents/validationBlock/validationBlock';
import Routes from "../../consts/Routes";

/**
 * Register content component
 * @class
 */
export default class RegisterContent extends Component {
    /**
     * Create a register content
     * @constructor
     * @param {Object} context - register content context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;
        this.context.input = [];

        for (const i in RegistrationItems) {
            if (i === 'avatar') {
                continue;
            }
            this.context.input.push((new TextInput(RegistrationItems[i])).render());
        }

        this.context.LoginEvent = Events.ChangePath;
        this.context.LoginPath = Routes.Login;
        this.context.Validation = (new ValidationBlock({
            message: 'Неверный логин и/или пароль',
        })).render();

        this.context.StandardButton = (new StandardButton({
            buttonName: 'Зарегистрироваться',
            event: Events.RegisterSubmit,
        })).render();
    }
}
