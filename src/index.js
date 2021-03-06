import 'regenerator-runtime/runtime.js';
import 'index.scss';
import CinemaListView from 'view/CinemaListView/CinemaListView';
import CinemaView from 'view/CinemaView/CinemaView';
import HallView from 'view/HallLayout/HallView';
import LoginView from 'view/LoginView/LoginView';
import MainView from 'view/MainView/MainView';
import MovieView from 'view/MovieView/MovieView';
import Router from 'services/Router';
import Routes from 'consts/Routes';
import RegisterView from 'view/RegisterView/RegisterView';
import ProfileView from 'view/ProfileView/ProfileView';
import PaymentView from 'view/PaymentView/PaymentView';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('sw registration on scope:', registration.scope);
        })
        .catch((err) => {
            console.error(err);
        });
}

const body = document.body;
const router = new Router(body);
router
    .register(Routes.Main, new MainView())
    .register(Routes.Register, new RegisterView())
    .register(Routes.Login, new LoginView())
    .register(Routes.MoviePage, new MovieView())
    .register(Routes.CinemaList, new CinemaListView())
    .register(Routes.ProfilePage, new ProfileView())
    .register(Routes.ScheduleID, new HallView())
    .register(Routes.CinemaPage, new CinemaView())
    .register(Routes.TicketPay, new PaymentView())
    .start();
