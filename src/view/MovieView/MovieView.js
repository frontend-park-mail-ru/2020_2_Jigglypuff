import template from './MovieView.hbs';
import View from '../BaseView/View';
import MovieDescription from '../../components/movieDescription/movieDescription';
import MovieViewModel from '../../viewmodels/MovieViewModel';
import Routes from '../../consts/Routes';
import Getter from '../../utils/Getter';
import BaseViewModel from '../../viewmodels/BaseViewModel';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';

class MovieView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.context = context;

        this.template = template;
        this.movieViewModel = new MovieViewModel();

        EventBus.on(Events.MovieRate, this.onMovieRate.bind(this));
    }

    async show(routeData) {
        let data = {};

        let movieDescriptionContext = await Getter.getMovie(routeData.id);
        movieDescriptionContext.pathToAvatar = Routes.Host + movieDescriptionContext.pathToAvatar;
        movieDescriptionContext.pathToSliderAvatar = Routes.Host + movieDescriptionContext.pathToSliderAvatar;

        console.log(movieDescriptionContext);
        movieDescriptionContext.rating = Math.round(movieDescriptionContext.rating * 100) / 100

        movieDescriptionContext.isAuthorized = await BaseViewModel.isAuthorised();

        data.MovieDescription = (new MovieDescription(movieDescriptionContext)).render();

        super.show(this.template(data));
    }

    async onMovieRate(routeDate) {

        let rating = document.getElementById('rating');

        if(!rating.value) {
            return;
        }

        let movieViewModel = new MovieViewModel();
        movieViewModel.state.personalRating = rating.value;
        movieViewModel.state.id = rating.dataset.movie;

        let responseMovieViewModel = movieViewModel.rateMovieCommand.exec();

        let ratingMark = document.getElementsByClassName('media-block__rating')[0];

        await responseMovieViewModel
            .then((response) => {
                if (!response.ok) {
                    if (ratingMark.classList.contains('hidden')) {
                        ratingMark.classList.remove('hidden');
                    }
                }

            })
            .catch((err) => {
                if (!ratingMark.classList.contains('hidden')) {
                    ratingMark.classList.add('hidden');
                }
            })

        EventBus.emit(Events.ChangePath, {path: Routes.MoviePage.replace(':id', rating.dataset.movie)});
    }
}

export default MovieView;
