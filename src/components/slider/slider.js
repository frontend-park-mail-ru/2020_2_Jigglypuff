import Component from '../component.js';
import template from './slider.hbs';
import WatchButton from '../baseComponents/buttons/watchButton/watchButton';
import PlayButton from '../baseComponents/buttons/playButton/playButton';
import Events from '../../consts/Events';
import Routes from '../../consts/Routes';
import MovieViewModel from '../../viewmodels/MovieViewModel';

/**
 * @class
 * Image input component
 */
export default class Slider extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;

        this.context.WatchButton = (new WatchButton({
            buttonName: 'Смотреть',
            url: Routes.MovieList + this.context.id + '/',
            event: Events.ChangePath,
        })).render();
    }


}
