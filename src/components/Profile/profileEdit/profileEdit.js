import Component from 'components/component';
import template from 'components/Profile/profileEdit/profileEdit.hbs';
import TextInput from 'components/BaseComponents/textInput/textInput';
import StandardButton from 'components/BaseComponents/buttons/standartButton/standardButton';
import ImageInput from 'components/BaseComponents/imageInput/imageInput';
import Events from 'consts/Events';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';

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
        this._template = template;

        const input = this._context;
        this._context = {};
        this._context.input = [];

        for (const i in input) {
            if (Object.prototype.hasOwnProperty.call(input, i)) {
                if (i === 'avatar') {
                    this._context.input.push((new ImageInput(input[i]).render()));
                    continue;
                }
                this._context.input.push((new TextInput(input[i])).render());
            }
        }

        this._context.Validation = (new ValidationBlock({
            message: 'Пожалуйста, загрузите верный формат аватара',
        })).render();

        this._context.StandardButton = (new StandardButton({
            buttonName: 'Редактировать',
            event: Events.ProfileEditSubmit,
        })).render();
    }
}
