import '../public/css/index.css';
import Router from './services/Router.js';
import Routes from './consts/Routes';
import MainView from './view/MainView/MainView.js';
import RegisterView from './view/RegisterView/RegisterView';
import LoginView from './view/LoginView/LoginView';
import MovieView from './view/MovieView/MovieView';
import CinemaListView from './view/CinemaListView/CinemaListView';
import ProfileView from './view/ProfileView/ProfileView';
import HallView from './view/HallLayout/HallView';

const body = document.body;
let router = new Router(body);
router
    .register(Routes.Main, new MainView())
    .register(Routes.Register, new RegisterView())
    .register(Routes.Login, new LoginView())
    .register(Routes.MoviePage, new MovieView())
    .register(Routes.CinemaList, new CinemaListView())
    .register(Routes.ProfilePage, new ProfileView())
    .register(Routes.ScheduleID, new HallView())
    .start();
