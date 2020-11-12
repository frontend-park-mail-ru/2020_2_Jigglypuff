import template from './MainView.hbs';
import View from '../BaseView/View';
import MovieList from '../../components/movieList/movieList';
import MovieViewModel from '../../viewmodels/MovieViewModel';
import Routes from '../../consts/Routes';
import MovieListViewModel from '../../viewmodels/MovieListViewModel';
import MovieCard from '../../components/movieCard/movieCard';

class MainView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.context = context;

        this.template = template;
    }

    async show() {

        let movieListContext = await this.getMovieListContext();
        let templateData = {
            MovieList: (new MovieList(movieListContext).render()),
        };

        await super.show(this.template(templateData), {isSlider: true});
    }


    async getMovieListContext() {
        let movieListContext = [];
        let responseMovieListViewModel = (new MovieListViewModel()).getMovieListCommand.exec();

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
        for (let i in movieListContext) {

            let movieVM = new MovieViewModel();
            let responseMovieVM = movieVM.getScheduleCommand.exec(movieListContext[i].id, 1, todayDate);

            await responseMovieVM
                .then((response) => {

                    movieListContext[i].scheduleContext = response;
                })
                .catch((err) => {
                    // console.log('\n\nMAIN_VIEW:GET_MOVIE_LIST_CONTEXT() :: ERR');
                    // console.log(err);
                    // console.log('MAIN_VIEW:GET_MOVIE_LIST_CONTEXT() :: ERR\n\n');
                });
        }


        let mlc = [];
        movieListContext.forEach(value => {
            if (value.hasOwnProperty('scheduleContext')) {
                mlc.push(value);
            }
        });
        return mlc;
    }
}

export default MainView;
