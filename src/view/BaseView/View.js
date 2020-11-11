import Header from '../../components/header/header';
import template from './View.hbs';
import Slider from '../../components/slider/slider';
import BaseViewModel from '../../viewmodels/BaseViewModel';
import SettingsViewModel from '../../viewmodels/SettingsViewModel';
import Routes from '../../consts/Routes';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import MovieViewModel from '../../viewmodels/MovieViewModel';
import Getter from '../../utils/Getter';

class View {
    constructor(title = 'CinemaScope', context = {}) {
        document.title = title;
        this.root = document.querySelector('.application');
        this.context = context;
        this.template = template;

        this.settingsViewModel = new SettingsViewModel();
    }

    async show(contentTemplate, templateDate = {}) {

        let headerContext = await this.getHeaderContext();
        let sliderContext = {};
        this.context.Header = (new Header(headerContext)).render();

        if (templateDate.hasOwnProperty('isSlider')) {
            this.context.isSlider = true;
            sliderContext = await this.getSliderContext();
            this.context.Slider = (new Slider(sliderContext)).render();
        }

        this.context.Content = contentTemplate;
        this.root.innerHTML = template(this.context);
    }

    hide() {
        this.content.innerHTML = '';
    }

    async getHeaderContext() {
        let headerContext = {};
        headerContext.userBlockContext = {};

        await BaseViewModel.isAuthorised().then((response) => {

            headerContext.userBlockContext.isAuthorized = response;

        }).catch((err) => {
            console.log('\n\nHEADER:GET_HEADER_CONTEXT() :: ERR');
            console.log(err);
            console.log('HEADER:GET_HEADER_CONTEXT() :: ERR\n\n');
        });

        if (headerContext.userBlockContext.isAuthorized) {
            let userInfo = await Getter.getProfile();
            if (userInfo) {
                headerContext.userBlockContext.pathToAvatar = Routes.Host + userInfo.pathToAvatar;
                headerContext.userBlockContext.name = userInfo.name;
                headerContext.userBlockContext.surname = userInfo.surname;
            }
        }
        return headerContext;
    }

    async getSliderContext() {

        let movieID = 3;
        let sliderContext = await Getter.getMovie(movieID);
        if (sliderContext) {
            sliderContext.pathToAvatar = Routes.Host + sliderContext.pathToAvatar;
            sliderContext.pathToSliderAvatar = Routes.Host + sliderContext.pathToSliderAvatar;
        }

        return sliderContext;
    }
}

export default View;
