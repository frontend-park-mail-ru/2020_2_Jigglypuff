import Component from '../component.js';
import template from './profileTickets.hbs';
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
export default class ProfileTickets extends Component {
    /**
     * Create a header
     * @param context - header context
     * @param parent
     * */
    constructor(context = {}, parent = {}) {
        super(context, parent);
        this.template = template;
        this.context.input = [];

        for (let i in RegistrationItems) {
            if (i === 'avatar') {
                this.context.input.push((new ImageInput(RegistrationItems[i]).render()));
                continue;
            }
            this.context.input.push((new TextInput(RegistrationItems[i])).render());
        }


        this.context.StandardButton = (new StandardButton({
            buttonName: 'Редактировать',
            event: Events.RegisterSubmit,
        })).render();
    }

}
