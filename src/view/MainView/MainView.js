import template from 'view/MainView/MainView.hbs';
import View from 'view/BaseView/View';
import MovieList from 'components/movieList/movieList';
import MovieViewModel from 'viewmodels/MovieViewModel';
import MovieListViewModel from 'viewmodels/MovieListViewModel';
import Filter from "components/filter/filter";
import CinemaListViewModel from "viewmodels/CinemaListViewModel";
import CinemaListView from "view/CinemaListView/CinemaListView";
import Events from "consts/Events";
import EventBus from "services/EventBus";

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

        EventBus.on(Events.UpdateMovieList, this.onUpdateMovieList.bind(this));
    }

    /**
     * Method that shows main page view
     */
    async show() {
        const movieListContext = await this.getMovieListContext();

        const cinemaList = await this.getCinemaList();
        movieListContext.Filtration = (new Filter({ cinemaList })).render();

        const templateData = {
            MovieList: (new MovieList(movieListContext)).render(),
        };

        await super.show(this._template(templateData), {isSlider: true});
    }

    /**
     * Method that gets movie list context
     * @param {Number} cinemaID
     * @param {string} date
     *
     * @return {Promise<Object>} - movie list context
     */
    async getMovieListContext(cinemaID = 1, date = '1970-01-01') {
        console.log(cinemaID, date);
        let movieListContext = [];
        const responseMovieListViewModel = (new MovieListViewModel()).getMovieListCommand.exec();

        await responseMovieListViewModel
            .then((response) => {
                movieListContext = response;
            })
            .catch((err) => {
                console.log('\n\nMAIN_VIEW:GET_MOVIE_LIST_CONTEXT() :: ERR');
                console.log(err);
                console.log('MAIN_VIEW:GET_MOVIE_LIST_CONTEXT() :: ERR\n\n');
            });

        if (date === '1970-01-01') {
            let todayDate = new Date();
            date = `${todayDate.getFullYear()}-${(+todayDate.getMonth() + 1)}-${todayDate.getDate()}`;
        }
        for (const i in movieListContext) {
            if (Object.prototype.hasOwnProperty.call(movieListContext, i)) {
                const movieVM = new MovieViewModel();
                const responseMovieVM = movieVM.getScheduleCommand.exec(movieListContext[i].id, cinemaID, date);

                await responseMovieVM
                    .then((response) => {
                        movieListContext[i].scheduleContext = response;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }


        return movieListContext.filter((item) => {
            return Object.prototype.hasOwnProperty.call(item, 'scheduleContext');
        });
    }

    async getCinemaList() {
        const cinemaListView = new CinemaListView();

        return await cinemaListView.getCinemaListContext();
    }

    async onUpdateMovieList(data){
        let movieList = document.querySelector('.movie-list');

        const cinemaList = await this.getCinemaList();
        let movieListContext = await this.getMovieListContext(data.cinemaID, data.date);

        movieListContext.Filtration = (new Filter({ cinemaList })).render();

        console.log(movieListContext);
        movieList.innerHTML = (new MovieList(movieListContext)).render();
    }
}
