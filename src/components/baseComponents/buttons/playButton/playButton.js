import Component from '../../../component.js';
import template from './playButton.hbs';

/**
 * Play Button component
 * @class
 */
export default class PlayButton extends Component {
    /**
     * Create a play button
     * @param {Object} context - play button context
     * */
    constructor(context) {
        super(context);
        this.template = template;
    }
}
