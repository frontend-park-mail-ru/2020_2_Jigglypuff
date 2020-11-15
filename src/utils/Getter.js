import CinemaViewModel from '../viewmodels/CinemaViewModel';
import MovieViewModel from '../viewmodels/MovieViewModel';
import SettingsViewModel from '../viewmodels/SettingsViewModel';
import EventBus from '../services/EventBus';
import Events from '../consts/Events';
import ScheduleViewModel from '../viewmodels/ScheduleViewModel';

/**
 * Class that gets different essence information
 */
export default class Getter {
    /**
     * Method that gets the cinema information
     * @param {Number} id - id of required cinema
     * @return {Promise<Object>} - cinema information
     */
    static async getCinema(id) {
        let cinema = {};
        const cinemaViewModel = new CinemaViewModel();
        const responseCinemaViewModel = cinemaViewModel.getCinemaCommand.exec(id);

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

    /**
     * Method that gets the movie information
     * @param {Number} id - id of required cinema
     * @return {Promise<Object>} - movie information
     */
    static async getMovie(id) {
        let movie = {};
        const movieViewModel = new MovieViewModel();
        const responseMovieViewModel = movieViewModel.getMovieCommand.exec(id);

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

    /**
     * Method that gets the session information
     * @param {Number} id - id of required cinema
     * @return {Promise<Object>} - session information
     */
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

    /**
     * Method that gets the profile information
     * @return {Promise<Object>} - profile information
     */
    static async getProfile() {
        let profile = {};
        const responseSettingsViewModel = new SettingsViewModel();

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
