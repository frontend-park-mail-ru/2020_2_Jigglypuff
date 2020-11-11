import Component from '../../../component.js';
import template from './playButton.hbs';

/**
 * @class
 * Play Button component
 */
export default class PlayButton extends Component {
    /**
     * Create a play button
     * @param context - play button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
