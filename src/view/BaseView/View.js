import Header from 'components/Main/header/header';
import template from 'view/BaseView/View.hbs';
import Slider from 'components/Main/slider/slider';
import BaseViewModel from 'viewmodels/BaseViewModel';
import Routes from 'consts/Routes';
import Getter from 'utils/Getter';
import Footer from 'components/Main/footer/footer';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';

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

        this._onLogoutHandler = this.onLogout.bind(this);
        EventBus.on(Events.Logout, this._onLogoutHandler);

        if (!document.querySelector('.header')) {
            const headerContext = await this.getHeaderContext();
            this._context.Header = (new Header(headerContext)).render();
        } else {
            this._context.Header = document.querySelector('.header').innerHTML;
        }
        this._context.Footer = (new Footer()).render();

        if (Object.prototype.hasOwnProperty.call(templateDate, 'isSlider')) {
            this._context.isSlider = true;
            sliderContext = await this.getSliderContext(templateDate.sliderMovies);
            this._context.Slider = (new Slider(sliderContext)).render();

            if (this._sliderTimer) {
                clearInterval(this._sliderTimer);
            }
            this._sliderTimer = setInterval(() => {
                EventBus.emit(Events.ScrollSlider, {target: document.querySelector('.slider__control_right')});
            }, 5000);
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
        document.querySelector('.footer').innerHTML = '';
        this.off();
    }

    /**
     *
     * */
    off() {
        if (this._sliderTimer) {
            clearInterval(this._sliderTimer);
        }
        EventBus.off(Events.Logout, this._onLogoutHandler);
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
                userInfo.isAuthorized = true;
                headerContext.userBlockContext = userInfo;
            }
        }
        return headerContext;
    }

    /**
     * Method that gets slider context
     * @param {Object} movies
     *
     * @return {Promise<Object>} - slider context
     */
    async getSliderContext(movies) {
        const sliderContext = {};
        sliderContext.movies = movies;
        for (const item of sliderContext.movies) {
            item.pathToAvatar = `${Routes.Host}${item.pathToAvatar}`;
            item.pathToSliderAvatar = `${Routes.Host}${item.pathToSliderAvatar}`;
        }
        return sliderContext;
    }

    /**
     * Method that handles logout from the profile
     */
    onLogout() {
        BaseViewModel.logout()
            .then(async () => {
                EventBus.emit(Events.UpdateHeader, {isAuthorized: false});
                EventBus.emit(Events.ChangePath, {path: Routes.Main});
            })
            .catch(() => {
                EventBus.emit(Events.ChangePath, {path: Routes.Main});
            });
    }
}
