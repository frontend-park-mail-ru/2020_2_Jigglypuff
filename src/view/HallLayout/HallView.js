import template from 'view/HallLayout/HallView.hbs';
import View from 'view/BaseView/View';
import HallLayout from 'components/Movie/hallLayout/hallLayout';
import HallViewModel from 'viewmodels/HallViewModel';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import TicketViewModel from 'viewmodels/TicketViewModel';
import BaseViewModel from 'viewmodels/BaseViewModel';
import Routes from 'consts/Routes';
import Getter from 'utils/Getter';

/**
 * Class of the hall view
 */
export default class HallView extends View {
    /**
     * Constructor of the hall view
     * @constructor
     * @param {string} title - title of the hall page
     */
    constructor(title = 'CinemaScope') {
        super(title);

        this._template = template;
    }

    /**
     * Method that shows the hall view
     * @param {Object} routeData - data from route path of the hall page
     */
    async show(routeData) {
        this._onTicketsBuyHandler = this.onBuy.bind(this);
        EventBus.on(Events.TicketsBuy, this._onTicketsBuyHandler);

        const session = await Getter.getSession(routeData.id);
        const hallContext = await this.getHallContext(session);
        this._hallLayout = new HallLayout(hallContext);

        const data = {
            hallLayout: (this._hallLayout.render()),
        };

        await super.show(this._template(data));
    }

    /**
     * Method that hides view
     * */
    hide() {
        EventBus.off(Events.TicketsBuy, this._onTicketsBuyHandler);
        this._hallLayout.hide();
        super.hide();
    }

    /**
     * Method that handles submitting of the ticket buy
     */
    async onBuy() {
        if (!(await BaseViewModel.isAuthorised())) {
            await EventBus.emit(Events.ChangePath, {path: Routes.Login});
            return;
        }

        let selectedPlacesDataset = [];

        selectedPlacesDataset = Array.from(document.getElementsByClassName('button-seat-selected')).map((place) => {
            return place.dataset;
        });

        const ticketViewModel = new TicketViewModel();
        for (const selectedPlace of selectedPlacesDataset) {
            const item = {};
            item.place = Number(selectedPlace.place);
            item.row = Number(selectedPlace.row);
            ticketViewModel.state.placeFields.push(item);
        }
        ticketViewModel.state.login = (await Getter.getProfile()).login;
        ticketViewModel.state.scheduleID = selectedPlacesDataset[0].session;

        const responseTicketViewModel = ticketViewModel.buyTicketCommand.exec();

        await responseTicketViewModel
            .then(() => {
                EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
            }).catch(() => {

            });
    }

    /**
     * Method that gets the hall context
     * @param {Object} session - information about current session
     * @return {Promise<Object>} - profile tickets context
     */
    async getHallContext(session) {
        const hallContext = {};

        const hallViewModel = new HallViewModel();
        hallViewModel.state.hallID = session.hallID;
        hallViewModel.state.scheduleID = session.id;

        const responseHallViewModel = hallViewModel.getPlacesCommand.exec();

        hallContext.name = (await Getter.getMovie(session.movieID)).name;
        hallContext.cinema = (await Getter.getCinema(session.cinemaID)).name;
        hallContext.date = session.date;
        hallContext.time = session.time;
        hallContext.sessionID = session.id;

        await responseHallViewModel
            .then((response) => {
                hallContext.hall = response;
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:GET_HALL_CONTEXT() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:GET_HALL_CONTEXT() :: ERR\n\n');
            });

        return hallContext;
    }
}
