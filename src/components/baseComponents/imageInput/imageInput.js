import Component from '../../component.js';
import template from './imageInput.hbs';
import EventBus from '../../../services/EventBus';
import Events from '../../../consts/Events';

/**
 * @class
 * Image input component
 */
export default class ImageInput extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;

        EventBus.on(Events.UploadAvatar, this.handleFileSelect.bind(this));
    }

    handleFileSelect(data) {

        let file = data.target.files[0];

        if (!file.type.match('image.*')) {
            let err = document.getElementsByClassName('image-input__error-disabled')[0];
            err.className = 'image-input__error';
            return;
        } else {
            let err = document.getElementsByClassName('image-input__error')[0];
            if (err) {
                err.className = 'image-input__error-disabled';
            }
        }

        let reader = new FileReader();

        reader.onload = (function() {
            return function(e) {
                let img = document.getElementsByClassName('avatar')[0];
                img.innerHTML = ['<img class="avatar__preview" src="', e.target.result, '"/>'].join('');
            };
        })(file);

        reader.readAsDataURL(file);
    }
}
