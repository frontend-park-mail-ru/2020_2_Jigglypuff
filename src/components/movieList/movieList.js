import Component from '../component.js';
import template from './movieList.hbs';
import WatchButton from '../baseComponents/buttons/watchButton/watchButton';
import PlayButton from '../baseComponents/buttons/playButton/playButton';
import MovieCard from '../movieCard/movieCard';
import MovieViewModel from '../../viewmodels/MovieViewModel';
import MovieListViewModel from '../../viewmodels/MovieListViewModel';

/**
 * @class
 * Image input component
 */
export default class MovieList extends Component {
    /**
     * Create a button
     * @param context - button context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;

        let movies = this.context;

        this.context = {};
        this.context.MovieCards = [];

        for (let i in movies) {
            this.context.MovieCards.push((new MovieCard(movies[i])).render());
        }
    }


}
