import template from './MainView.hbs';
import View from '../BaseView/View';
import MovieList from '../../components/movieList/movieList';
import MovieViewModel from '../../viewmodels/MovieViewModel';
import MovieListViewModel from '../../viewmodels/MovieListViewModel';

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
        this.template = template;
    }

    /**
     * Method that shows main page view
     */
    async show() {
        const movieListContext = await this.getMovieListContext();
        const templateData = {
            MovieList: (new MovieList(movieListContext).render()),
        };

        await super.show(this.template(templateData), {isSlider: true});
    }

    /**
     * Method that gets movie list context
     * @return {Promise<Object>} - movie list context
     */
    async getMovieListContext() {
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

        let todayDate = new Date();
        todayDate = todayDate.getFullYear() + '-' + (+todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        for (const i in movieListContext) {
            if (Object.prototype.hasOwnProperty.call(movieListContext, i)) {
                const movieVM = new MovieViewModel();
                const responseMovieVM = movieVM.getScheduleCommand.exec(movieListContext[i].id, 1, todayDate);

                await responseMovieVM
                    .then((response) => {
                        movieListContext[i].scheduleContext = response;
                    })
                    .catch(() => {
                        // console.log('\n\nMAIN_VIEW:GET_MOVIE_LIST_CONTEXT() :: ERR');
                        // console.log(err);
                        // console.log('MAIN_VIEW:GET_MOVIE_LIST_CONTEXT() :: ERR\n\n');
                    });
            }
        }

        const mlc = [];
        movieListContext.forEach((value) => {
            if (Object.prototype.hasOwnProperty.call(value, 'scheduleContext')) {
                mlc.push(value);
            }
        });
        return mlc;
    }
}
