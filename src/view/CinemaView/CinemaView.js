import template from './CinemaView.hbs';
import View from '../BaseView/View';
import Getter from '../../utils/Getter';
import Cinema from '../../components/cinemaPage/cinema';

/**
 * Class of the cinema view
 */
export default class CinemaView extends View {
    /**
     * Constructor of the profile view
     * @constructor
     * @param {string} title - title of the profile page
     */
    constructor(title = 'CinemaScope') {
        super(title);

        this.template = template;
    }

    /**
     * Method that shows the cinema view
     * @param {Object} routeData - data from route path of the cinema page
     */
    async show(routeData) {
        const cinemaContext = await Getter.getCinema(routeData.id);
        const data = {
            Cinema: (new Cinema(cinemaContext).render()),
        };

        console.log(data);
        await super.show(this.template(data));
    }
}
