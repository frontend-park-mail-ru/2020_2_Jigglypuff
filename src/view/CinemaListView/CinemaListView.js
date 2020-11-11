import template from './CinemaListView.hbs';
import View from '../BaseView/View';
import Slider from '../../components/slider/slider';
import MovieList from '../../components/movieList/movieList';
import CinemaList from '../../components/CinemaList/cinemaList';

class CinemaListView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.context = context;

        this.template = template;
    }

    show(routeData) {
        let data = {
            CinemaList: (new CinemaList().render()),
        };
        super.show(this.template(data));
    }
}

export default CinemaListView;
