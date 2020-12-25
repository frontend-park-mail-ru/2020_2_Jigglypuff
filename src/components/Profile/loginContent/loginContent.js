import Component from 'components/component';
import template from 'components/Profile/loginContent/loginContent.hbs';
import TextInput from 'components/BaseComponents/textInput/textInput';
import StandardButton from 'components/BaseComponents/buttons/standartButton/standardButton';
import LoginItems from 'consts/LoginItems';
import Events from 'consts/Events';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';
import Routes from 'consts/Routes';

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
        this._template = template;
        this._context.input = [];

        for (const i in LoginItems) {
            if (Object.prototype.hasOwnProperty.call(LoginItems, i)) {
                this._context.input.push((new TextInput(LoginItems[i])).render());
            }
        }

        this._context.RegisterPath = Routes.Register;
        this._context.RegisterEvent = Events.ChangePath;

        this._context.Validation = (new ValidationBlock({
            message: 'Пожалуйста, загрузите верный формат аватара',
        })).render();

        this._context.StandardButton = (new StandardButton({
            buttonName: 'Войти',
            event: Events.LoginSubmit,
        })).render();
    }
}
