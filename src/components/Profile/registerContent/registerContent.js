import Component from 'components/component';
import template from 'components/Profile/registerContent/registerContent.hbs';
import RegistrationItems from 'consts/RegistrationItems';
import TextInput from 'components/BaseComponents/textInput/textInput';
import StandardButton from 'components/BaseComponents/buttons/standartButton/standardButton';
import Events from 'consts/Events';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';
import Routes from 'consts/Routes';

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
        this._template = template;

        this._context.input = [];

        for (const i in RegistrationItems) {
            if (i === 'avatar') {
                continue;
            }
            this._context.input.push((new TextInput(RegistrationItems[i])).render());
        }

        this._context.LoginEvent = Events.ChangePath;
        this._context.LoginPath = Routes.Login;
        this._context.Validation = (new ValidationBlock({
            message: 'Неверный логин и/или пароль',
        })).render();

        this._context.StandardButton = (new StandardButton({
            buttonName: 'Зарегистрироваться',
            event: Events.RegisterSubmit,
        })).render();
    }
}
