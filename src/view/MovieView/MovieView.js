import template from 'view/MovieView/MovieView.hbs';
import View from 'view/BaseView/View';
import MovieDescription from 'components/movieDescription/movieDescription';
import MovieViewModel from 'viewmodels/MovieViewModel';
import Routes from 'consts/Routes';
import Getter from 'utils/Getter';
import BaseViewModel from 'viewmodels/BaseViewModel';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import MovieSchedule from 'components/movieSchedule/movieSchedule';
import Filter from 'components/filter/filter';
import ValidationBlock from 'components/baseComponents/validationBlock/validationBlock';

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

        EventBus.on(Events.UpdateSchedule, this.onUpdateSchedule.bind(this));
        EventBus.on(Events.MovieRate, this.onMovieRate.bind(this));
    }

    /**
     * Method that shows the movie view
     * @param {Object} routeData - data from route path of the movie page
     */
    async show(routeData) {
        this._movieID = routeData.id;
        const movieContext = await this.getMovieContext();

        this._visibility = !movieContext.movieScheduleContext.sessions;

        const data = {};
        data.Validation = (new ValidationBlock(
            {
                message: 'На данный момент нет актуальных сеансов',
                visibility: this._visibility,
            },
        )).render();

        data.Filtration = (new Filter(
            {
                cinemaList: await Getter.getCinemaList(),
                target: 'schedule',
            },
        )).render();
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
     * @param {string} cinemaName
     * @param {number} cinemaID
     * @param {string} date
     *
     * @return {Object}
     */
    async getMovieContext(cinemaName, cinemaID = 1, date = '1970-01-01') {
        const movieContext = {};

        if (!cinemaName) {
            cinemaName = (await Getter.getCinema(cinemaID)).name;
        }

        movieContext.movieScheduleContext = {};
        movieContext.movieScheduleContext.cinemaName = cinemaName;

        movieContext.movieDescriptionContext = await Getter.getMovie(this._movieID);

        movieContext.movieDescriptionContext.pathToAvatar = `${Routes.Host}${movieContext.movieDescriptionContext.pathToAvatar}`;
        movieContext.movieDescriptionContext.pathToSliderAvatar = `${Routes.Host}${movieContext.movieDescriptionContext.pathToSliderAvatar}`;
        movieContext.movieDescriptionContext.rating = Math.round(movieContext.movieDescriptionContext.rating * 100) / 100;
        movieContext.movieDescriptionContext.isAuthorized = await BaseViewModel.isAuthorised();

        const todayDate = new Date();

        if (date === '1970-01-01') {
            date = `${todayDate.getFullYear()}-${(+todayDate.getMonth() + 1)}-${todayDate.getDate()}`;
        }

        const movieVM = new MovieViewModel();
        const responseMovieVM = movieVM.getScheduleCommand.exec(this._movieID, cinemaID, date);
        await responseMovieVM
            .then((response) => {
                movieContext.movieScheduleContext.sessions = response;
            })
            .catch((err) => {
                // console.log(err);
            });

        return movieContext;
    }

    /**
     * Method that handles updating schedule
     * @param {Object} data - updating schedule data
     * @return {Object}
     */
    async onUpdateSchedule(data) {
        const schedule = document.querySelector('.movie-schedule-content');

        const {movieScheduleContext} = await this.getMovieContext(data.cinemaName, data.cinemaID, data.date);

        const validation = document.querySelector('.validation-block');
        if (!movieScheduleContext.sessions) {
            validation.classList.remove('validation-display-none');
        } else {
            validation.classList.add('validation-display-none');
        }

        if (schedule) {
            schedule.innerHTML = (new MovieSchedule(movieScheduleContext)).render();

            const scroll = document.getElementById('schedule');
            scroll.scrollIntoView(true);
        }
    }
}
