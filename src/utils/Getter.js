import CinemaViewModel from '../viewmodels/CinemaViewModel';
import MovieViewModel from '../viewmodels/MovieViewModel';
import SettingsViewModel from '../viewmodels/SettingsViewModel';

export default class Getter {
    static async getCinema(id) {

        let cinemaViewModel = new CinemaViewModel();
        let responseCinemaViewModel = cinemaViewModel.getCinemaCommand.exec(id);

        await responseCinemaViewModel
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_CINEMA_NAME() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_CINEMA_NAME() :: ERR\n\n');
            });

        return null;
    }

    static async getMovie(id) {

        let movieViewModel = new MovieViewModel();
        let responseMovieViewModel = movieViewModel.getMovieCommand.exec(id);

        await responseMovieViewModel
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_MOVIE_NAME() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_MOVIE_NAME() :: ERR\n\n');
            });

        return null;
    }

    static async getSession(id) {

        const scheduleViewModel = new ScheduleViewModel();
        const responseScheduleViewModel = scheduleViewModel.getSessionCommand.exec(id);

        await responseScheduleViewModel
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_SESSION() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_SESSION() :: ERR\n\n');
            });

        return null;
    }

    static async getProfile() {
        let responseSettingsViewModel = new SettingsViewModel();

        await responseSettingsViewModel.getProfile()
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_USER_LOGIN() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_USER_LOGIN() :: ERR\n\n');
            });

        return null;
    }
}
