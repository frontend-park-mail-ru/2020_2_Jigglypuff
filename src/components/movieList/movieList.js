import Component from '../component.js';
import template from './movieList.hbs';
import MovieCard from '../movieCard/movieCard';

/**
 * Movie list component
 * @class
 */
export default class MovieList extends Component {
    /**
     * Create a movie list component
     * @constructor
     * @param {Object} context - movie list context
     * */
    constructor(context = {}) {
        super(context);
        this.template = template;

        const movies = this.context;

        this.context = {};
        this.context.MovieCards = [];

        for (const i in movies) {
            if (Object.prototype.hasOwnProperty.call(movies, i)) {
                this.context.MovieCards.push((new MovieCard(movies[i])).render());
            }
        }
    }
}
