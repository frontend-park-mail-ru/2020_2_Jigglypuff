import template from 'view/MainView/MainView.hbs';
import View from 'view/BaseView/View';
import MovieList from 'components/movieList/movieList';
import MovieViewModel from 'viewmodels/MovieViewModel';
import MovieListViewModel from 'viewmodels/MovieListViewModel';
import Filter from 'components/filter/filter';
import Events from 'consts/Events';
import EventBus from 'services/EventBus';
import ValidationBlock from 'components/baseComponents/validationBlock/validationBlock';
import Getter from 'utils/Getter';
import Slider from "components/slider/slider";

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

        const movieListContext = await this.getMovieListContext();
        const cinemaList = await Getter.getCinemaList();
        this._filter = new Filter(
            {
                cinemaList,
                target: 'cinema'
            }
        );

        this._visibility = !movieListContext.length;

        const templateData = {
            MovieList: (new MovieList(movieListContext)).render(),
            Filtration: this._filter.render(),
            Validation: (new ValidationBlock({
                message: 'На данный момент нет актуальных сеансов',
                visibility: this._visibility,
            })).render(),
        };

        await super.show(this._template(templateData), {isSlider: true});
    }

    hide() {
        this._filter.hide();
        EventBus.off(Events.UpdateMovieList, this._onUpdateMovieListHandler);
        super.hide();
    }

    /**
     * Method that gets movie list context
     * @param {string} cinemaName
     * @param {Number} cinemaID
     * @param {string} date
     *
     * @return {Promise<Object>} - movie list context
     */
    async getMovieListContext(cinemaName, cinemaID = 1, date) {
        let movieListContext = [];
        const todayDate = new Date();

        if (!cinemaName) {
            cinemaName = (await Getter.getCinema(cinemaID)).name;
        }
        if (!date) {
            date = `${todayDate.getFullYear()}-${(+todayDate.getMonth() + 1)}-${todayDate.getDate()}`;
        }

        const responseMovieListViewModel = (new MovieListViewModel()).getMovieActualListCommand.exec(date);

        await responseMovieListViewModel
            .then(response => {
                movieListContext = response;
            })
            .catch(err => {
                console.log('\n\nMAIN_VIEW:GET_MOVIE_LIST_CONTEXT() :: ERR');
                console.log(err);
                console.log('MAIN_VIEW:GET_MOVIE_LIST_CONTEXT() :: ERR\n\n');
            });


        for (const item of movieListContext) {
            const responseMovieVM = (new MovieViewModel()).getScheduleCommand.exec(item.id, cinemaID, date);
            await responseMovieVM
                .then((response) => {
                    item.scheduleContext = response;
                    item.cinemaName = cinemaName;
                })
                .catch((err) => {
                    // console.log(err);
                });
        }

        return movieListContext.filter(item => {
            return Object.prototype.hasOwnProperty.call(item, 'scheduleContext');
        });
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
}
