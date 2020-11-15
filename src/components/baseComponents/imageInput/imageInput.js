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
        this.template = template;

        EventBus.on(Events.UploadAvatar, this.handleFileSelect.bind(this));
    }

    /**
     * Method that shows the image preview
     * @param {Object} data - image input content
     * */
    handleFileSelect(data) {
        const file = data.target.files[0];

        if (!file.type.match('image.*')) {
            const err = document.getElementsByClassName('image-input__error-disabled')[0];
            err.className = 'image-input__error';
            return;
        } else {
            const err = document.getElementsByClassName('image-input__error')[0];
            if (err) {
                err.className = 'image-input__error-disabled';
            }
        }

        const reader = new FileReader();

        reader.onload = (function() {
            return function(e) {
                const img = document.getElementsByClassName('avatar')[0];
                img.innerHTML = ['<img class="avatar__preview" src="', e.target.result, '"/>'].join('');
            };
        })(file);

        reader.readAsDataURL(file);
    }
}
