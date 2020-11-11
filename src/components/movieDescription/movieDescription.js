import Component from '../component.js';
import template from './movieDescription.hbs';
import PlayButton from '../baseComponents/buttons/playButton/playButton';
import StandardButton from '../baseComponents/buttons/standartButton/standardButton';
import Events from '../../consts/Routes';

/**
 * @class
 * Image input component
 */
export default class MovieDescription extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context) {
        super(context);
        this.template = template;

        this.context.StandardButton = (new StandardButton({
            buttonName: 'Оценить',
            event: Events.RateMovie,
        }).render())
        // this.context.PlayButton = (new PlayButton()).render();
    }
}