import template from 'view/MovieView/MovieView.hbs';
import View from 'view/BaseView/View';
import MovieDescription from 'components/movieDescription/movieDescription';
import MovieViewModel from 'viewmodels/MovieViewModel';
import Routes from 'consts/Routes';
import Getter from 'utils/Getter';
import BaseViewModel from 'viewmodels/BaseViewModel';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import MovieSchedule from "components/movieSchedule/movieSchedule";
import Months from "consts/Months";

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
        const movieContext = await this.getMovieContext(routeData.id);

        const data = {};
        data.MovieDescription = (new MovieDescription(movieContext.movieDescriptionContext)).render();
        data.MovieSchedule = (new MovieSchedule(movieContext.movieScheduleContext)).render();

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

        const ratingMark = document.getElementsByClassName('media-block__rating')[0];

        await responseMovieViewModel
            .then((response) => {
                if (response.ok) {
                    if (ratingMark.classList.contains('hidden')) {
                        ratingMark.classList.remove('hidden');
                    }
                }
            })
            .catch((err) => {
                console.log('NOT OK');
                if (!ratingMark.classList.contains('hidden')) {
                    ratingMark.classList.add('hidden');
                }
            });

        EventBus.emit(Events.ChangePath, {path: Routes.MoviePage.replace(':id', rating.dataset.movie)});
    }

    /**
     * Method that returns movie context
     * @param {Number} movieID - id of the required movie
     *
     * @return {Object}
     */
    async getMovieContext(movieID) {
        let movieContext = {};
        movieContext.movieScheduleContext = {};
        movieContext.movieDescriptionContext = await Getter.getMovie(movieID);

        movieContext.movieDescriptionContext.pathToAvatar = `${Routes.Host}${movieContext.movieDescriptionContext.pathToAvatar}`;
        movieContext.movieDescriptionContext.pathToSliderAvatar = `${Routes.Host}${movieContext.movieDescriptionContext.pathToSliderAvatar}`;
        movieContext.movieDescriptionContext.rating = Math.round(movieContext.movieDescriptionContext.rating * 100) / 100;
        movieContext.movieDescriptionContext.isAuthorized = await BaseViewModel.isAuthorised();

        let todayDate = new Date();
        let todayDay = `${todayDate.getDate()} ${(Months[+todayDate.getMonth()])}`;
        todayDate = `${todayDate.getFullYear()}-${(+todayDate.getMonth() + 1)}-${todayDate.getDate()}`;

        const movieVM = new MovieViewModel();
        const responseMovieVM = movieVM.getScheduleCommand.exec(movieID, 1, todayDate);
        await responseMovieVM
            .then((response) => {
                movieContext.movieScheduleContext.sessions = response;
            })
            .catch(() => {
            });

        movieContext.movieScheduleContext.date = todayDay;
        console.log(todayDay);

        return movieContext;
    }
}
