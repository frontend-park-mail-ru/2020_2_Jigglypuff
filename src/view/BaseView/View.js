import Header from '../../components/header/header';
import template from './View.hbs';
import Slider from '../../components/slider/slider';
import BaseViewModel from '../../viewmodels/BaseViewModel';
import SettingsViewModel from '../../viewmodels/SettingsViewModel';
import Routes from '../../consts/Routes';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import MovieViewModel from '../../viewmodels/MovieViewModel';

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
            this.context.Slider = await (new Slider(sliderContext)).render();
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
            await this.settingsViewModel.getProfile()
                .then((response) => {
                    headerContext.userBlockContext.pathToAvatar = Routes.Host + response.pathToAvatar;
                    headerContext.userBlockContext.name = response.name;
                    headerContext.userBlockContext.surname = response.surname;
                })
                .catch((err) => {
                    console.log('\n\nVIEW:GET_HEADER_CONTEXT() :: ERR');
                    console.log(err);
                    console.log('VIEW:GET_HEADER_CONTEXT() :: ERR\n\n');
                });
        }
        return headerContext;
    }

    async getSliderContext() {
        let sliderContext = {};
        let responseMovieViewModel = (new MovieViewModel()).getMovieCommand.exec(3);

        await responseMovieViewModel
            .then((response) => {
                sliderContext = response;
            })
            .catch((err) => {
                console.log('\n\nSLIDER:GET_SLIDER_CONTEXT() :: ERR');
                console.log(err);
                console.log('SLIDER:GET_SLIDER_CONTEXT() :: ERR\n\n');
            });

        sliderContext.pathToAvatar = Routes.Host + sliderContext.pathToAvatar;
        sliderContext.pathToSliderAvatar = Routes.Host + sliderContext.pathToSliderAvatar;

        return sliderContext;
    }
}

export default View;
