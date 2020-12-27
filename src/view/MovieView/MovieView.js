import template from 'view/MovieView/MovieView.hbs';
import View from 'view/BaseView/View';
import MovieDescription from 'components/Movie/movieDescription/movieDescription';
import MovieViewModel from 'viewmodels/MovieViewModel';
import Routes from 'consts/Routes';
import Getter from 'utils/Getter';
import BaseViewModel from 'viewmodels/BaseViewModel';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import MovieSchedule from 'components/Movie/movieSchedule/movieSchedule';
import Filter from 'components/BaseComponents/filter/filter';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';
import ReplyBlock from 'components/Profile/replyBlock/replyBlock';

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
    }

    /**
     * Method that shows the movie view
     * @param {Object} routeData - data from route path of the movie page
     */
    async show(routeData) {
        this.movieViewModel = new MovieViewModel();

        this._onUpdateScheduleHandler = this.onUpdateSchedule.bind(this);
        this._onMovieRateHandler = this.onMovieRate.bind(this);
        this._onSubmitReplyHandler = this.onSubmitReply.bind(this);
        this._onUpdateReplyHadler = this.onUpdateReply.bind(this);

        EventBus.on(Events.UpdateSchedule, this._onUpdateScheduleHandler);
        EventBus.on(Events.MovieRate, this._onMovieRateHandler);
        EventBus.on(Events.SubmitReply, this._onSubmitReplyHandler);
        EventBus.on(Events.UpdateReply, this._onUpdateReplyHadler);

        this._replyText = null;

        this._movieID = routeData.id;
        const movieContext = await this.getMovieContext();

        this._visibility = !movieContext.movieScheduleContext.sessions;


        movieContext.movieScheduleContext.Validation = (new ValidationBlock(
            {
                message: 'На данный момент нет актуальных сеансов',
                visibility: this._visibility,
            },
        )).render();

        this._filter = new Filter(
            {
                cinemaList: await Getter.getCinemaList(),
                target: 'schedule',
            },
        );

        this._MovieDescription = new MovieDescription(movieContext.movieDescriptionContext);
        this._MovieSchedule = new MovieSchedule(movieContext.movieScheduleContext);
        this._ReplyBlock = new ReplyBlock(movieContext.movieReplyContext);

        const data = {
            Filtration: this._filter.render(),
            MovieDescription: this._MovieDescription.render(),
            MovieSchedule: this._MovieSchedule.render(),
            MovieReviews: this._ReplyBlock.render(),
        };

        await super.show(this._template(data));
    }

    /**
     * Method that hides view
     * */
    hide() {
        this.off();
        super.hide();
    }

    off() {
        this._filter.off();
        this._MovieDescription.off();
        this._MovieSchedule.off();
        this._ReplyBlock.off();

        EventBus.off(Events.UpdateSchedule, this._onUpdateScheduleHandler);
        EventBus.off(Events.MovieRate, this._onMovieRateHandler);
        EventBus.off(Events.SubmitReply, this._onSubmitReplyHandler);
        EventBus.off(Events.UpdateReply, this._onUpdateReplyHadler);
        super.off();
    }

    /**
     * Method that handles movie rating
     */
    async onMovieRate() {
        const rating = document.getElementById('rating');

        if (!rating.value) {
            return;
        }

        this.movieViewModel.state.personalRating = rating.value;
        this.movieViewModel.state.id = rating.dataset.movie;

        const responseMovieViewModel = this.movieViewModel.rateMovieCommand.exec();

        const ratingMark = document.getElementsByClassName('media-block__rating')[0];

        await responseMovieViewModel
            .then((response) => {
                if (response.ok) {
                    if (ratingMark.classList.contains('hidden')) {
                        ratingMark.classList.remove('hidden');
                    }
                    EventBus.emit(Events.ChangePath, {path: Routes.MoviePage.replace(':id', this._movieID)});
                }
            })
            .catch(() => {
                if (!ratingMark.classList.contains('hidden')) {
                    ratingMark.classList.add('hidden');
                }
            });
    }

    /**
     * Method that handles change of the reply text
     * @param {Object} data
     */
    async onUpdateReply(data) {
        this._replyText = data.value;
    }

    /**
     * Method that handles submit of the reply text
     * @param {Object} data
     */
    async onSubmitReply(data) {
        console.log(data);
        let responseMovieViewModel;
        console.log(data.reply);
        if (data.reply) {
            responseMovieViewModel = this.movieViewModel.updateReplyCommand.exec(this._replyText, data.reply);
        } else {
            responseMovieViewModel = this.movieViewModel.createReplyCommand.exec(this._movieID, this._replyText);
        }

        const validation = document.querySelector('.replies').querySelector('.validation-block');
        await responseMovieViewModel
            .then(() => {
                validation.classList.add('validation-display-none');
                EventBus.emit(Events.ChangePath, {path: Routes.MoviePage.replace(':id', this._movieID)});
            }).catch(() => {
                validation.classList.remove('validation-display-none');
            });
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
        const todayDate = new Date();

        movieContext.movieScheduleContext = {};
        movieContext.movieScheduleContext.cinemaName = cinemaName;
        if (date === '1970-01-01') {
            date = `${todayDate.getFullYear()}-${(+todayDate.getMonth() + 1)}-${todayDate.getDate()}`;
        }

        movieContext.movieScheduleContext.date = date;

        movieContext.movieDescriptionContext = await Getter.getMovie(this._movieID);

        movieContext.movieDescriptionContext.pathToAvatar = `${Routes.Host}${movieContext.movieDescriptionContext.pathToAvatar}`;
        movieContext.movieDescriptionContext.pathToSliderAvatar = `${Routes.Host}${movieContext.movieDescriptionContext.pathToSliderAvatar}`;
        movieContext.movieDescriptionContext.rating = Math.round(movieContext.movieDescriptionContext.rating * 100) / 100;
        movieContext.movieDescriptionContext.isAuthorized = await BaseViewModel.isAuthorised();


        let responseMovieVM = (new MovieViewModel()).getScheduleCommand.exec(this._movieID, cinemaID, date);
        await responseMovieVM
            .then((response) => {
                movieContext.movieScheduleContext.sessions = response;
            }).catch(() => {

            });

        movieContext.movieReplyContext = {};
        responseMovieVM = this.movieViewModel.getRepliesCommand.exec(this._movieID);
        await responseMovieVM
            .then((response) => {
                movieContext.movieReplyContext.replies = response;
            }).catch(() => {

            });

        if (movieContext.movieDescriptionContext.isAuthorized) {
            const currentProfile = await Getter.getProfile();
            if (currentProfile) {
                movieContext.movieReplyContext.profile = currentProfile;
            }
        }
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
            this._visibility = true;
        } else {
            validation.classList.add('validation-display-none');
            this._visibility = false;
        }

        if (document.querySelector('.movie-schedule__schedule-block') &&
            document.querySelector('.movie-schedule__schedule-block').innerHTML) {
            movieScheduleContext.Validation = (new ValidationBlock(
                {
                    message: 'На данный момент нет актуальных сеансов',
                    visibility: this._visibility,
                },
            )).render();
            console.log(schedule.innerHTML);
            schedule.innerHTML = await (new MovieSchedule(movieScheduleContext)).render();

            const scroll = document.getElementById('schedule');
            scroll.scrollIntoView(true);
        }
    }
}
