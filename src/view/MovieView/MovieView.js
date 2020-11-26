import template from 'view/MovieView/MovieView.hbs';
import View from 'view/BaseView/View';
import MovieDescription from 'components/movieDescription/movieDescription';
import MovieViewModel from 'viewmodels/MovieViewModel';
import Routes from 'consts/Routes';
import Getter from 'utils/Getter';
import BaseViewModel from 'viewmodels/BaseViewModel';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';

/**
 * Class of the movie view
 */
export default class MovieView extends View {
    /**
     * Constructor of the movie view
     * @constructor
     * @param {string} title - title of the movie page
     */
    constructor(title = 'CinemaScope') {
        super(title);
        this._template = template;

        EventBus.on(Events.MovieRate, this.onMovieRate.bind(this));
    }

    /**
     * Method that shows the movie view
     * @param {Object} routeData - data from route path of the movie page
     */
    async show(routeData) {
        const data = {};

        const movieDescriptionContext = await Getter.getMovie(routeData.id);
        movieDescriptionContext.pathToAvatar = `${Routes.Host}${movieDescriptionContext.pathToAvatar}`;
        movieDescriptionContext.pathToSliderAvatar = `${Routes.Host}${movieDescriptionContext.pathToSliderAvatar}`;

        console.log(movieDescriptionContext);
        movieDescriptionContext.rating = Math.round(movieDescriptionContext.rating * 100) / 100;

        movieDescriptionContext.isAuthorized = await BaseViewModel.isAuthorised();

        data.MovieDescription = (new MovieDescription(movieDescriptionContext)).render();

        await super.show(this._template(data));
    }

    /**
     * Method that handles movie rating
     */
    async onMovieRate() {
        const rating = document.getElementById('rating');

        if (!rating.value) {
            return;
        }

        const movieViewModel = new MovieViewModel();
        movieViewModel.state.personalRating = rating.value;
        movieViewModel.state.id = rating.dataset.movie;

        const responseMovieViewModel = movieViewModel.rateMovieCommand.exec();

        const ratingMark = document.querySelector('.media-block__rating');

        await responseMovieViewModel
            .then((response) => {
                if (!response.ok) {
                    if (ratingMark.classList.contains('hidden')) {
                        ratingMark.classList.remove('hidden');
                    }
                }
            })
            .catch(() => {
                if (!ratingMark.classList.contains('hidden')) {
                    ratingMark.classList.add('hidden');
                }
            });

        EventBus.emit(Events.ChangePath, {path: Routes.MoviePage.replace(':id', rating.dataset.movie)});
    }
}
