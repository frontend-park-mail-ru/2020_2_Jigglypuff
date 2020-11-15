import Component from '../component.js';
import template from './profileEdit.hbs';
import TextInput from '../baseComponents/textInput/textInput';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import ImageInput from '../baseComponents/imageInput/imageInput';
import Events from '../../consts/Events';
import ValidationBlock from '../baseComponents/validationBlock/validationBlock';

/**
 * Profile edit component
 * @class
 */
export default class ProfileEdit extends Component {
    /**
     * Create a profile edit component
     * @constructor
     * @param {Object} context - profile edit context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;

        const input = this.context;
        this.context = {};
        this.context.input = [];

        for (const i in input) {
            if (Object.prototype.hasOwnProperty.call(input, i)) {
                if (i === 'avatar') {
                    this.context.input.push((new ImageInput(input[i]).render()));
                    continue;
                }
                this.context.input.push((new TextInput(input[i])).render());
            }
        }

        this.context.Validation = (new ValidationBlock({
            message: 'Пожалуйста, загрузите верный формат аватара',
        })).render();

        this.context.StandardButton = (new StandardButton({
            buttonName: 'Редактировать',
            event: Events.ProfileEditSubmit,
        })).render();
    }
}
