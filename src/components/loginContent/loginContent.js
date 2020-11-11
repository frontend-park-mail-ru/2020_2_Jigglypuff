import Component from '../component.js';
import template from './loginContent.hbs';
import TextInput from '../baseComponents/textInput/textInput';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import LoginItems from '../../consts/LoginItems';
import Events from '../../consts/Events';

/**
 * @class
 * Header component
 */
export default class LoginContent extends Component {
    /**
     * Create a header
     * @param context - header context
     * @param parent
     * */
    constructor(context = {}, parent = {}) {
        super(context, parent);
        this.template = template;
        this.context.input = [];

        for (let i in LoginItems) {
            this.context.input.push((new TextInput(LoginItems[i])).render());
        }

        this.context.StandardButton = (new StandardButton({
            buttonName: 'Войти',
            event: Events.LoginSubmit,
        })).render();

    }

    onUpdate(data = {}) {

    }
}
