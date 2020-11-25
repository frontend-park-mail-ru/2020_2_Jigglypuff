import template from './ProfileView.hbs';
import View from '../BaseView/View';
import ProfileContent from '../../components/profileContent/profileContent';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import BaseViewModel from '../../viewmodels/BaseViewModel';
import SettingsViewModel from '../../viewmodels/SettingsViewModel';
import Routes from '../../consts/Routes';
import ProfileEditItems from '../../consts/ProfileEditItems';
import TicketListViewModel from '../../viewmodels/TicketListViewModel';
import Getter from '../../utils/Getter';

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

        EventBus.on(Events.Logout, this.onLogout.bind(this));
        EventBus.on(Events.ProfileEditFieldFill, this.onUpdateField.bind(this));
        EventBus.on(Events.UploadAvatar, this.onUpdateField.bind(this));
        EventBus.on(Events.ProfileEditSubmit, this.onSubmit.bind(this));
    }

    /**
     * Method that shows profile view
     */
    async show() {
        if (!(await BaseViewModel.isAuthorised())) {
            EventBus.emit(Events.ChangePath, {path: Routes.Login});
            return;
        }

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
        profileEdit.avatar.pathToAvatar = `${Routes.Host}${userProfile.pathToAvatar}`;

        return profileEdit;
    }

    /**
     * Method that gets the profile tickets context
     * @return {Promise<Object>} - profile tickets context
     */
    async getProfileTicketContext() {
        const ticketListViewModel = new TicketListViewModel();

        const profileTicketContext = [];
        const responseTicketList = ticketListViewModel.getTicketListCommand.exec();

        let ticketList = [];
        await responseTicketList
            .then((response) => {
                ticketList = response;
                console.log('\n\n-----PROFILE_VIEW:getProfileTicketContext()-----');
                console.log(response);
                console.log('-----PROFILE_VIEW:getProfileTicketContext()-----\n\n');
            })
            .catch((err) => {
                console.log('\n\n-----PROFILE_VIEW:getProfileTicketContext()-----');
                console.log(err);
                console.log('-----PROFILE_VIEW:getProfileTicketContext()-----\n\n');
            });

        if (!ticketList) {
            return profileTicketContext;
        }

        for (const value of ticketList) {
            const ticket = {};

            value.schedule = await Getter.getSession(value.schedule.id);
            ticket.hall = value.schedule.hallID;
            ticket.row = value.placeField.row;
            ticket.place = value.placeField.place;
            ticket.movie = (await Getter.getMovie(value.schedule.movieID)).name;
            ticket.cinema = (await Getter.getCinema(value.schedule.cinemaID)).name;
            ticket.date = value.schedule.date;
            ticket.time = value.schedule.time;

            profileTicketContext.push(ticket);
        }

        return profileTicketContext;
    }

    /**
     * Method that handles logout from the profile
     */
    onLogout() {
        BaseViewModel.logout()
            .then(() => {
                console.log('\n\n-----PROFILE_VIEW:ON_LOGOUT()-----');
                console.log('SUCCESS');
                console.log('-----PROFILE_VIEW:ON_LOGOUT()-----\n\n');

                EventBus.emit(Events.ChangePath, {path: Routes.Main});
            })
            .catch((err) => {
                console.log('\n\n-----PROFILE_VIEW:ON_LOGOUT()-----');
                console.log(err);
                console.log('-----PROFILE_VIEW:ON_LOGOUT()-----\n\n');

                EventBus.emit(Events.ChangePath, {path: Routes.Main});
            });
    }

    /**
     * Method that hides the profile view
     */
    hide() {
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
            .then(() => {
                console.log('\n\n-----PROFILE_VIEW:ON_SUBMIT()-----');
                console.log('OK');
                console.log('-----PROFILE_VIEW:ON_SUBMIT()-----\n\n');
            })
            .catch((err) => {
                console.log('\n\n-----PROFILE_VIEW:ON_SUBMIT()-----');
                console.log('NOT OK');
                console.log('-----PROFILE_VIEW:ON_SUBMIT()-----\n\n');

                const validation = document.querySelector('.validation-block');
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });

        await this.show();
    }
}
