import template from 'view/ProfileView/ProfileView.hbs';
import View from 'view/BaseView/View';
import ProfileContent from 'components/profileContent/profileContent';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import BaseViewModel from 'viewmodels/BaseViewModel';
import SettingsViewModel from 'viewmodels/SettingsViewModel';
import Routes from 'consts/Routes';
import ProfileEditItems from 'consts/ProfileEditItems';
import TicketListViewModel from 'viewmodels/TicketListViewModel';
import Getter from 'utils/Getter';

/**
 * Class of the profile view
 */
export default class ProfileView extends View {
    /**
     * Constructor of the profile view
     * @constructor
     * @param {string} title - title of the profile page
     */
    constructor(title = 'CinemaScope') {
        super(title);
        this._template = template;

        this._settingsViewModel = new SettingsViewModel();
    }

    /**
     * Method that shows profile view
     */
    async show() {
        if (!(await BaseViewModel.isAuthorised())) {
            EventBus.emit(Events.ChangePath, {path: Routes.Login});
            return;
        }

        this._onLogoutHandler = this.onLogout.bind(this);
        this._onUpdateFieldHandler = this.onUpdateField.bind(this);
        this._onProfileEditSubmitHandler = this.onSubmit.bind(this);

        EventBus.on(Events.Logout, this._onLogoutHandler);
        EventBus.on(Events.ProfileEditFieldFill, this._onUpdateFieldHandler);
        EventBus.on(Events.UploadAvatar, this._onUpdateFieldHandler);
        EventBus.on(Events.ProfileEditSubmit, this._onProfileEditSubmitHandler);

        const profileContext = {
            profileEdit: {},
            profileTickets: {},
        };

        profileContext.profileEdit = await this.getProfileEditContext();
        profileContext.profileTickets = await this.getProfileTicketContext();

        const data = {
            ProfileContent: (new ProfileContent(profileContext)).render(),
        };
        await super.show(this._template(data));
    }

    /**
     * Method that gets the profile editing context
     * @return {Promise<Object>} - profile editing context
     */
    async getProfileEditContext() {
        const profileEdit = ProfileEditItems;

        const userProfile = await Getter.getProfile();

        for (const i in profileEdit) {
            if (Object.prototype.hasOwnProperty.call(userProfile, i) && i !== 'avatar') {
                profileEdit[i].inputPlaceholder = userProfile[i];
            }
        }
        profileEdit.avatar.pathToAvatar = userProfile.pathToAvatar;

        return profileEdit;
    }

    /**
     * Method that gets the profile tickets context
     * @return {Promise<Object>} - profile tickets context
     */
    async getProfileTicketContext() {
        const ticketListViewModel = new TicketListViewModel();

        const profileTicketContext = {};
        const responseTicketList = ticketListViewModel.getTicketListCommand.exec();
        let profileHistoryTickets = [];
        let profileActualTickets = [];
        profileTicketContext.profileHistoryTickets = [];
        profileTicketContext.profileActualTickets = [];
        await responseTicketList
            .then(() => {
                profileHistoryTickets = ticketListViewModel.stateHistoryTicketList;
                profileActualTickets = ticketListViewModel.stateActualTicketList;
            }).catch(() => {

            });

        if (!profileHistoryTickets && !profileActualTickets) {
            return profileTicketContext;
        }

        for (const value of profileHistoryTickets) {
            const ticket = {};

            const schedule = await Getter.getSession(value.schedule.id);
            ticket.hall = schedule.hallID;
            ticket.row = value.placeField.row;
            ticket.place = value.placeField.place;
            ticket.movie = (await Getter.getMovie(value.schedule.movieID)).name;
            ticket.cinema = (await Getter.getCinema(value.schedule.cinemaID)).name;
            ticket.date = value.schedule.date;
            ticket.time = value.schedule.time;

            profileTicketContext.profileHistoryTickets.push(ticket);
        }
        for (const value of profileActualTickets) {
            const ticket = {};
            const schedule = await Getter.getSession(value.schedule.id);

            value.schedule = await Getter.getSession(value.schedule.id);
            ticket.hall = schedule.hallID;
            ticket.row = value.placeField.row;
            ticket.place = value.placeField.place;
            ticket.movie = (await Getter.getMovie(value.schedule.movieID)).name;
            ticket.cinema = (await Getter.getCinema(value.schedule.cinemaID)).name;
            ticket.date = value.schedule.date;
            ticket.time = value.schedule.time;
            ticket.qrpath = `${Routes.Host}${value.qrpath}.png`;

            profileTicketContext.profileActualTickets.push(ticket);
        }

        return profileTicketContext;
    }

    /**
     * Method that handles logout from the profile
     */
    onLogout() {
        BaseViewModel.logout()
            .then(async () => {
                EventBus.emit(Events.UpdateHeader, {isAuthorized: false});
                EventBus.emit(Events.ChangePath, {path: Routes.Main});
            })
            .catch(() => {
                EventBus.emit(Events.ChangePath, {path: Routes.Main});
            });
    }

    /**
     * Method that hides the profile view
     */
    hide() {
        EventBus.off(Events.Logout, this._onLogoutHandler);
        EventBus.off(Events.ProfileEditFieldFill, this._onUpdateFieldHandler);
        EventBus.off(Events.UploadAvatar, this._onUpdateFieldHandler);
        EventBus.off(Events.ProfileEditSubmit, this._onProfileEditSubmitHandler);

        super.hide();
    }

    /**
     * Method that handles input from the profile editing fields
     * @param {Object} data - contains entered data from input field
     */
    onUpdateField(data) {
        if (data.id === 'avatar') {
            this._settingsViewModel.state[data.id] = data.target.files[0];
            return;
        }
        this._settingsViewModel.state[data.id] = data.value;
    }

    /**
     * Method that handles submitting of the profile editing form
     */
    async onSubmit() {
        const responseProfileEdit = this._settingsViewModel.editCommand.exec();

        await responseProfileEdit
            .then(async () => {
                EventBus.emit(Events.UpdateHeader, {isAuthorized: true, ...(await Getter.getProfile())});
            })
            .catch((err) => {
                const validation = document.querySelector('.validation-block');
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });

        await this.show();
    }
}
