import Header from '../../components/header/header';
import template from './View.hbs';
import Slider from '../../components/slider/slider';
import BaseViewModel from '../../viewmodels/BaseViewModel';
import Routes from '../../consts/Routes';
import Getter from '../../utils/Getter';

/**
 * Base class of the view
 */
export default class View {
    /**
     * Constructor of the base view
     * @constructor
     * @param {string} title - title of the page
     */
    constructor(title = 'CinemaScope') {
        document.title = title;
        this._root = document.querySelector('.application');
        this._template = template;
        this._context = {};
    }

    /**
     * Method that shows page
     * @param {string} contentTemplate - rendered template of page
     * @param {Object} templateDate - current template data
     */
    async show(contentTemplate, templateDate = {}) {
        const headerContext = await this.getHeaderContext();
        let sliderContext = {};
        this._context.Header = (new Header(headerContext)).render();

        if (Object.prototype.hasOwnProperty.call(templateDate, 'isSlider')) {
            this._context.isSlider = true;
            sliderContext = await this.getSliderContext();
            this._context.Slider = (new Slider(sliderContext)).render();
        }

        this._context.Content = contentTemplate;
        this._root.innerHTML = template(this._context);
    }

    /**
     * Method that hides the page content
     */
    hide() {
        this._root.innerHTML = '';
    }

    /**
     * Method that gets header context
     * @return {Promise<Object>} - header context
     */
    async getHeaderContext() {
        const headerContext = {};
        headerContext.userBlockContext = {};

        await BaseViewModel.isAuthorised().then((response) => {
            headerContext.userBlockContext.isAuthorized = response;
        }).catch((err) => {
            console.log('\n\nHEADER:GET_HEADER_CONTEXT() :: ERR');
            console.log(err);
            console.log('HEADER:GET_HEADER_CONTEXT() :: ERR\n\n');
        });

        if (headerContext.userBlockContext.isAuthorized) {
            const userInfo = await Getter.getProfile();
            if (userInfo) {
                headerContext.userBlockContext.pathToAvatar = Routes.Host + userInfo.pathToAvatar;
                headerContext.userBlockContext.name = userInfo.name;
                headerContext.userBlockContext.surname = userInfo.surname;
            }
        }
        return headerContext;
    }

    /**
     * Method that gets slider context
     * @return {Promise<Object>} - slider context
     */
    async getSliderContext() {
        const movieID = 3;

        const sliderContext = await Getter.getMovie(movieID);
        if (sliderContext) {
            sliderContext.pathToAvatar = Routes.Host + sliderContext.pathToAvatar;
            sliderContext.pathToSliderAvatar = Routes.Host + sliderContext.pathToSliderAvatar;
        }

        return sliderContext;
    }
}
