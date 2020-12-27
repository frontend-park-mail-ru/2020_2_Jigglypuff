import Component from 'components/component';
import template from 'components/BaseComponents/imageInput/imageInput.hbs';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import Avatar from 'components/BaseComponents/avatar/avatar';

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

        this._handleFileSelectHandler = this._handleFileSelect.bind(this);

        if (!this._isRendered) {
            EventBus.on(Events.UploadAvatar, this._handleFileSelectHandler);
            this._isRendered = true;
        }

        this._context.Avatar = (new Avatar({pathToAvatar: this._context.pathToAvatar})).render();
    }

    /**
     * Method that shows the image preview
     * @param {Object} data - image input content
     * */
    _handleFileSelect(data) {
        const file = data.target.files[0];

        if (!file.type.match('image.*')) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (() => {
            return function(file) {
                const avatar = document.querySelector('.image-input__wrapper_avatar');
                const avatarPreview = document.createElement('img');
                avatarPreview.className = 'avatar';
                avatarPreview.src = file.target.result;
                avatar.innerHTML = avatarPreview.outerHTML;
            };
        })(file);

        reader.readAsDataURL(file);
    }

    /**
     *
     * */
    off() {
        EventBus.on(Events.UploadAvatar, this._handleFileSelectHandler);
    }
}
