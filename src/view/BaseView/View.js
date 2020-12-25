import Header from 'components/Main/header/header';
import template from 'view/BaseView/View.hbs';
import Slider from 'components/Main/slider/slider';
import BaseViewModel from 'viewmodels/BaseViewModel';
import Routes from 'consts/Routes';
import Getter from 'utils/Getter';
import Footer from "components/Main/footer/footer";

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
        let sliderContext = {};

        if (!document.querySelector('.header')) {
            const headerContext = await this.getHeaderContext();
            this._context.Header = (new Header(headerContext)).render();
        } else {
            this._context.Header = document.querySelector('.header').innerHTML;
        }
        this._context.Footer = (new Footer()).render();

        if (Object.prototype.hasOwnProperty.call(templateDate, 'isSlider')) {
            this._context.isSlider = true;
            sliderContext = await this.getSliderContext(templateDate.sliderMovieID);
            this._context.Slider = (new Slider(sliderContext)).render();
        }

        this._context.Content = contentTemplate;
        this._root.innerHTML = template(this._context);
    }

    /**
     * Method that hides the page content
     */
    hide() {
        if (this._context.isSlider) {
            document.querySelector('.slider').innerHTML = '';
        }
        document.querySelector('.content').innerHTML = '';
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
        }).catch(() => {

        });

        if (headerContext.userBlockContext.isAuthorized) {
            const userInfo = await Getter.getProfile();
            if (userInfo) {
                headerContext.userBlockContext.pathToAvatar = userInfo.pathToAvatar;
                headerContext.userBlockContext.name = userInfo.name;
                headerContext.userBlockContext.surname = userInfo.surname;
            }
        }
        return headerContext;
    }

    /**
     * Method that gets slider context
     * @param {number} movieID
     *
     * @return {Promise<Object>} - slider context
     */
    async getSliderContext(movieID) {
        const sliderContext = await Getter.getMovie(movieID);
        if (sliderContext) {
            sliderContext.pathToAvatar = `${Routes.Host}${sliderContext.pathToAvatar}`;
            sliderContext.pathToSliderAvatar = `${Routes.Host}${sliderContext.pathToSliderAvatar}`;
        }

        return sliderContext;
    }
}
