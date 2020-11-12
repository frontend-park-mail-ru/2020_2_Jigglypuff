import template from './CinemaListView.hbs';
import View from '../BaseView/View';
import Slider from '../../components/slider/slider';
import MovieList from '../../components/movieList/movieList';
import CinemaList from '../../components/CinemaList/cinemaList';
import CinemaListViewModel from '../../viewmodels/CinemaListViewModel';

class CinemaListView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.context = context;

        this.template = template;
    }

    async show(routeData) {

        let cinemaListContext = await this.getCinemaListContext();

        let data = {
            CinemaList: (new CinemaList(cinemaListContext).render()),
        };
        super.show(this.template(data));
    }

    async getCinemaListContext() {

        let cinemaListContext = {};

        let responseCinemaList = (new CinemaListViewModel()).getCinemaListCommand.exec();

        await responseCinemaList
            .then(response => {
                cinemaListContext = response;
            })
            .catch(err => {
                console.log(err);
            })

        return cinemaListContext;
    }
}

export default CinemaListView;
