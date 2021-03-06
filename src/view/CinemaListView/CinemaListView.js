import template from 'view/CinemaListView/CinemaListView.hbs';
import View from 'view/BaseView/View';
import CinemaList from 'components/Cinema/cinemaList/cinemaList';
import Getter from 'utils/Getter';

/**
 * Class of the cinema view
 */
export default class CinemaListView extends View {
    /**
     * Constructor of the cinema list view
     * @constructor
     * @param {string} title - title of the cinema list page
     */
    constructor(title = 'CinemaScope') {
        super(title);

        this._template = template;
    }

    /**
     * Method that shows cinema list view
     */
    async show() {
        const cinemaListContext = await this.getCinemaListContext();

        this._CinemaList = new CinemaList(cinemaListContext);
        const data = {
            CinemaList: this._CinemaList.render(),
        };
        await super.show(this._template(data));
    }

    /**
     * Method that gets cinema list context
     * @return {Promise<Object>} - cinema list context
     */
    async getCinemaListContext() {
        return await Getter.getCinemaList();
    }

    /**
     *
     * */
    hide() {
        this.off();
        super.hide();
    }

    /**
     *
     * */
    off() {
        this._CinemaList.off();
    }
}
