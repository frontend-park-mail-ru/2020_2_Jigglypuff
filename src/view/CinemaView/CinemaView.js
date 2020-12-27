import template from 'view/CinemaView/CinemaView.hbs';
import View from 'view/BaseView/View';
import Cinema from 'components/Cinema/cinemaPage/cinema';
import Getter from 'utils/Getter';

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

        this._template = template;
    }

    /**
     * Method that shows the cinema view
     * @param {Object} routeData - data from route path of the cinema page
     */
    async show(routeData) {
        const cinemaContext = await Getter.getCinema(routeData.id);

        this._Cinema = new Cinema(cinemaContext);
        const data = {
            Cinema: this._Cinema.render(),
        };

        await super.show(this._template(data));
    }

    hide() {
        this.off();
        super.hide();
    }

    off() {
        this._Cinema.off();
    }
}
