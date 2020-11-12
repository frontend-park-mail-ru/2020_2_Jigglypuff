import CinemaViewModel from '../viewmodels/CinemaViewModel';
import MovieViewModel from '../viewmodels/MovieViewModel';
import SettingsViewModel from '../viewmodels/SettingsViewModel';
import EventBus from '../services/EventBus';
import Events from '../consts/Events';
import ScheduleViewModel from '../viewmodels/ScheduleViewModel';

export default class Getter {
    static async getCinema(id) {

        let cinema = {};
        let cinemaViewModel = new CinemaViewModel();
        let responseCinemaViewModel = cinemaViewModel.getCinemaCommand.exec(id);

        await responseCinemaViewModel
            .then((response) => {
                cinema = response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_CINEMA_NAME() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_CINEMA_NAME() :: ERR\n\n');
            });

        return cinema;
    }

    static async getMovie(id) {

        let movie = {};
        let movieViewModel = new MovieViewModel();
        let responseMovieViewModel = movieViewModel.getMovieCommand.exec(id);

        await responseMovieViewModel
            .then((response) => {

                movie = response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_MOVIE_NAME() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_MOVIE_NAME() :: ERR\n\n');
            });

            return movie;
    }

    static async getSession(id) {

        let session = {};
        const scheduleViewModel = new ScheduleViewModel();
        const responseScheduleViewModel = scheduleViewModel.getSessionCommand.exec(id);

        await responseScheduleViewModel
            .then((response) => {
                session = response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_SESSION() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_SESSION() :: ERR\n\n');
            });

        return session;
    }

    static async getProfile() {
        let profile = {};
        let responseSettingsViewModel = new SettingsViewModel();

        await responseSettingsViewModel.getProfile()
            .then((response) => {
                profile = response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_USER_LOGIN() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_USER_LOGIN() :: ERR\n\n');
                EventBus.emit(Events.ChangePath, {path: '/auth/login/'});
            });

        return profile;
    }
}
