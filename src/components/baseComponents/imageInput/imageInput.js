import Component from '../../component.js';
import template from './imageInput.hbs';
import EventBus from '../../../services/EventBus';
import Events from '../../../consts/Events';

/**
 * Image input component
 * @class
 */
export default class ImageInput extends Component {
    /**
     * Create an image input
     * @constructor
     * @param {Object} context - image input context
     * */
    constructor(context) {
        super(context);
        this._template = template;

        EventBus.on(Events.UploadAvatar, this.handleFileSelect.bind(this));
    }

    /**
     * Method that shows the image preview
     * @param {Object} data - image input content
     * */
    handleFileSelect(data) {
        const file = data.target.files[0];

        if (!file.type.match('image.*')) {
            const err = document.querySelector('.image-input__error-disabled');
            err.className = 'image-input__error';
            return;
        } else {
            const err = document.querySelector('.image-input__error');
            if (err) {
                err.className = 'image-input__error-disabled';
            }
        }

        const reader = new FileReader();
        reader.onload = (() => {
            return function(file) {
                const avatar = document.querySelector('.avatar');
                const avatarPreview = document.createElement('img');
                avatarPreview.className = 'avatar__preview';
                avatarPreview.src = file.target.result;
                avatar.innerHTML = avatarPreview.outerHTML;
            };
        })(file);

        reader.readAsDataURL(file);
    }
}
