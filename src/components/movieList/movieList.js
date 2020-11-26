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
        this._template = template;

        const movies = this._context;

        this._context = {};
        this._context.MovieCards = [];

        for (const i in movies) {
            if (Object.prototype.hasOwnProperty.call(movies, i)) {
                this._context.MovieCards.push((new MovieCard(movies[i])).render());
            }
        }
    }
}
