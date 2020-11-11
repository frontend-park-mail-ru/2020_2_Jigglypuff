import Component from '../component.js';
import template from './profileEdit.hbs';
import RegistrationItems from '../../consts/RegistrationItems';
import TextInput from '../baseComponents/textInput/textInput';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import EventBus from '../../services/EventBus';
import ImageInput from '../baseComponents/imageInput/imageInput';
import Events from '../../consts/Events';

/**
 * @class
 * Header component
 */
export default class ProfileEdit extends Component {
    /**
     * Create a header
     * @param context - header context
     * @param parent
     * */
    constructor(context = {}, parent = {}) {
        super(context, parent);
        this.template = template;

        const input = this.context;
        this.context = {};
        this.context.input = [];

        for (let i in input) {
            if (i === 'avatar') {
                this.context.input.push((new ImageInput(input[i]).render()));
                continue;
            }
            this.context.input.push((new TextInput(input[i])).render());
        }

        this.context.StandardButton = (new StandardButton({
            buttonName: 'Редактировать',
            event: Events.ProfileEditSubmit,
        })).render();
    }
}
