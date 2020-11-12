import template from './CinemaView.hbs';
import View from '../BaseView/View';
import Getter from '../../utils/Getter';
import Cinema from '../../components/Cinema/cinema';

class CinemaView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.context = context;

        this.template = template;
    }

    async show(routeData) {
        let cinemaContext = await Getter.getCinema(routeData.id);
        let data = {
            Cinema: (new Cinema(cinemaContext).render()),
        };

        console.log(data);
        super.show(this.template(data));
    }
}

export default CinemaView;
