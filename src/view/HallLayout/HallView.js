import template from './HallView.hbs';
import View from '../BaseView/View';
import MovieList from '../../components/movieList/movieList';
import HallLayout from '../../components/hallLayout/hallLayout';
import HallViewModel from '../../viewmodels/HallViewModel';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import TicketViewModel from '../../viewmodels/TicketViewModel';
import CinemaListViewModel from '../../viewmodels/CinemaListViewModel';
import CinemaViewModel from '../../viewmodels/CinemaViewModel';
import MovieViewModel from '../../viewmodels/MovieViewModel';
import BaseViewModel from '../../viewmodels/BaseViewModel';
import Routes from '../../consts/Routes';
import SettingsViewModel from '../../viewmodels/SettingsViewModel';
import Getter from '../../utils/Getter';

class HallView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.context = context;

        EventBus.on(Events.TicketsBuy, this.onBuy.bind(this));
        this.template = template;
    }

    async show(routeData) {

        let session = await Getter.getSession(routeData.id);
        let hallContext = await this.getHallContext(session);


        let data = {
            hallLayout: (new HallLayout(hallContext).render()),
        };


        await super.show(this.template(data));
    }

    async onBuy(data) {

        let selectedPlaceDataset = document.getElementsByClassName('button-seat')[0].dataset;

        const ticketViewModel = new TicketViewModel();
        ticketViewModel.state.login = Getter.getProfile();
        ticketViewModel.state.placeField.place = selectedPlaceDataset.place;
        ticketViewModel.state.placeField.row = selectedPlaceDataset.row;
        ticketViewModel.state.scheduleID = selectedPlaceDataset.sessionID;

        const responseTicketViewModel = ticketViewModel.buyTicketCommand.exec();

        await responseTicketViewModel
            .then((response) => {
                console.log('\n\nHALL_VIEW:ON_BUY()');
                console.log(response);
                console.log('HALL_VIEW:ON_BUY()\n\n');
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:ON_BUY() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:ON_BUY() :: ERR\n\n');
            });

        EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
    }




    async getHallContext(session) {

        let hallContext = {};

        const hallViewModel = new HallViewModel();
        hallViewModel.state.hallID = session.hallID;
        hallViewModel.state.ticketID = session.id;

        const responseHallViewModel = hallViewModel.getPlacesCommand.exec();
        hallContext.name = await Getter.getMovie(session.movieID).name;
        hallContext.cinema = await Getter.getCinema(session.cinemaID).name;
        hallContext.date = session.time;
        hallContext.sessionID = session.id;

        await responseHallViewModel
            .then((res) => {
                hallContext.hall = res;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_HALL_CONTEXT() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_HALL_CONTEXT() :: ERR\n\n');
            });
        return hallContext;
    }

}

export default HallView;
