import template from 'view/MainView/MainView.hbs';
import View from 'view/BaseView/View';
import MovieList from 'components/Movie/movieList/movieList';
import MovieViewModel from 'viewmodels/MovieViewModel';
import MovieListViewModel from 'viewmodels/MovieListViewModel';
import Filter from 'components/BaseComponents/filter/filter';
import Events from 'consts/Events';
import EventBus from 'services/EventBus';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';
import Getter from 'utils/Getter';

/**
 * Class of the main page view
 */
export default class MainView extends View {
    /**
     * Constructor of the main page view
     * @constructor
     * @param {string} title - title of the main page
     */
    constructor(title = 'CinemaScope') {
        super(title);
        this._template = template;
    }

    /**
     * Method that shows main page view
     */
    async show() {
        this._onUpdateMovieListHandler = this.onUpdateMovieList.bind(this);
        EventBus.on(Events.UpdateMovieList, this._onUpdateMovieListHandler);

        const movieRecommendationContext = await this.getMovieRecommendationContext();

        const cinemaList = await Getter.getCinemaList();
        this._filter = new Filter(
            {
                cinemaList,
                target: 'cinema',
            },
        );

        const templateData = {
            MovieRecommendation: (new MovieList(movieRecommendationContext)).render(),
            Filtration: this._filter.render(),
            Validation: (new ValidationBlock({
                message: 'На данный момент нет актуальных сеансов',
                visibility: this._visibility,
            })).render(),
        };

        await super.show(this._template(templateData), {isSlider: true, sliderMovies: movieRecommendationContext});
    }

    /**
     * Method that hides view
     * */
    hide() {
        this._filter.hide();
        EventBus.off(Events.UpdateMovieList, this._onUpdateMovieListHandler);
        super.hide();
    }

    /**
     * Method that handles updating movie list
     * @param {Object} data - updating movie list data
     * */
    async onUpdateMovieList(data) {
        const movieList = document.querySelector('.movie-list__content');

        const movieListContext = await this.getMovieListContext(data.cinemaName, data.cinemaID, data.date);

        const validation = document.querySelector('.validation-block');
        if (!movieListContext.length) {
            validation.classList.remove('validation-display-none');
        } else {
            validation.classList.add('validation-display-none');
        }

        if (movieList && movieList.innerHTML) {
            movieList.innerHTML = (new MovieList(movieListContext)).render();

            const scroll = document.getElementById('film_premiers');
            scroll.scrollIntoView(true);
        }
    }

    /**
     * Method that gets movie recommendation context
     * @return {Promise<Object>} - movie recommendation context
     */
    async getMovieRecommendationContext() {
        const movieRecommendationContext = [];

        const responseMovieListViewModel = (new MovieListViewModel()).getRecommendationsListCommand.exec();

        await responseMovieListViewModel
            .then((response) => {
                for (let i = 0; i < 6; i++) {
                    movieRecommendationContext.push(response[i]);
                }
            }).catch(() => {

            });
        return movieRecommendationContext;
    }
}
