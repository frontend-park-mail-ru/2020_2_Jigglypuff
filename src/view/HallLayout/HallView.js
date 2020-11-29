import template from 'view/HallLayout/HallView.hbs';
import View from 'view/BaseView/View';
import HallLayout from 'components/hallLayout/hallLayout';
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
        this._onTicketSelectHandler = this.onSelect.bind(this);

        EventBus.on(Events.TicketsBuy, this._onTicketsBuyHandler);
        EventBus.on(Events.TicketSelect, this._onTicketSelectHandler);

        const session = await Getter.getSession(routeData.id);
        const hallContext = await this.getHallContext(session);

        const data = {
            hallLayout: (new HallLayout(hallContext).render()),
        };

        await super.show(this._template(data));
    }

    hide() {
        EventBus.off(Events.TicketsBuy, this._onTicketsBuyHandler);
        EventBus.off(Events.TicketSelect, this._onTicketSelectHandler);

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

        let selectedPlaceDataset = {};

        try {
            selectedPlaceDataset = document.getElementsByClassName('button-seat-selected')[0].dataset;
        } catch (err) {
            const validation = (document.querySelector('.hall-layout')).getElementsByClassName('validation-block')[0];
            validation.classList.remove('validation-display-none');
            return;
        }

        const ticketViewModel = new TicketViewModel();
        ticketViewModel.state.login = (await Getter.getProfile()).login;
        ticketViewModel.state.placeField.place = selectedPlaceDataset.place;
        ticketViewModel.state.placeField.row = selectedPlaceDataset.row;
        ticketViewModel.state.scheduleID = selectedPlaceDataset.session;

        const responseTicketViewModel = ticketViewModel.buyTicketCommand.exec();

        await responseTicketViewModel
            .then(() => {
                console.log('\n\nHALL_VIEW:ON_BUY()');
                console.log('OK');
                console.log('HALL_VIEW:ON_BUY()\n\n');
            })
            .catch((err) => {
                console.log('\n\nHALL_VIEW:ON_BUY() :: ERR');
                console.log(err);
                console.log('HALL_VIEW:ON_BUY() :: ERR\n\n');
            });

        EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
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

    /**
     * Method that handles place selection in the hall
     * @param {Object} data - information about current hall layout
     */
    onSelect(data) {
        if (data.target.classList.contains('button-seat-occupied')) {
            return;
        }

        const hallPlaces = document.getElementsByClassName('button-seat');

        for (const i in hallPlaces) {
            if (Object.prototype.hasOwnProperty.call(hallPlaces, i)) {
                const hallPlacesClassList = hallPlaces[i].classList;
                const hallPlacesDataset = hallPlaces[i].dataset;

                if (data.place === hallPlacesDataset.place && data.row === hallPlacesDataset.row) {
                    if (hallPlacesClassList.contains('button-seat-selected')) {
                        hallPlacesClassList.remove('button-seat-selected');
                    } else if (!hallPlacesClassList.contains('button-seat-occupied')) {
                        hallPlacesClassList.add('button-seat-selected');
                    }
                } else {
                    if (hallPlacesClassList.contains('button-seat-selected')) {
                        hallPlacesClassList.remove('button-seat-selected');
                    }
                }
            }
        }
    }
}
