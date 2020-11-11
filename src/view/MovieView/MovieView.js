import template from './MovieView.hbs';
import View from '../BaseView/View';
import MovieDescription from '../../components/movieDescription/movieDescription';
import MovieViewModel from '../../viewmodels/MovieViewModel';
import Routes from '../../consts/Routes';

class MovieView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.context = context;

        this.template = template;
        this.movieViewModel = new MovieViewModel();
    }

    async show(routeData) {
        let data = {};

        const responseMovieViewModel = this.movieViewModel.getMovieCommand.exec(routeData.id);

        let temp = {};

        await responseMovieViewModel
            .then((response) => {
                response.pathToAvatar = Routes.Host + response.pathToAvatar;
                response.pathToSliderAvatar = Routes.Host + response.pathToSliderAvatar;
                temp = Object.assign(temp, response);
            })
            .catch((err) => {
                console.log(err);
            });
        data.MovieDescription = (new MovieDescription(temp)).render();

        super.show(this.template(data));
    }
}

export default MovieView;
