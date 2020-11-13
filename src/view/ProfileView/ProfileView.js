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

class ProfileView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.template = template;

        this.settingsViewModel = new SettingsViewModel();

        EventBus.on(Events.Logout, this.onLogout.bind(this));
        EventBus.on(Events.ProfileEditFieldFill, this.onUpdateField.bind(this));
        EventBus.on(Events.UploadAvatar, this.onUpdateField.bind(this));
        EventBus.on(Events.ProfileEditSubmit, this.onSubmit.bind(this));
    }

    async show() {

        if (!(await BaseViewModel.isAuthorised())) {
            EventBus.emit(Events.ChangePath, {path: Routes.Login});
            return;
        }

        let profileContext = {
            profileEdit: {},
            profileTickets: {},
        };

        profileContext.profileEdit = await this.getProfileEditContext();
        profileContext.profileTickets = await this.getProfileTicketContext();

        const data = {
            ProfileContent: (new ProfileContent(profileContext)).render(),
        };
        super.show(this.template(data));
    }

    async getProfileEditContext() {
        let profileEdit = ProfileEditItems;

        let userProfile = await Getter.getProfile();
        for (let i in profileEdit) {
            if (userProfile.hasOwnProperty(i) && i !== 'avatar') {
                profileEdit[i].inputPlaceholder = userProfile[i];
            }
        }
        profileEdit.avatar.pathToAvatar = Routes.Host + userProfile.pathToAvatar;

        return profileEdit;
    }

    async getProfileTicketContext() {

        let ticketListViewModel = new TicketListViewModel();

        let profileTicketContext = [];
        let responseTicketList = ticketListViewModel.getTicketListCommand.exec();

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
                console.log('NOT OK');
                console.log('-----PROFILE_VIEW:getProfileTicketContext()-----\n\n');

            });

        if (!ticketList) {
            return profileTicketContext;
        }

        for (const value of ticketList) {
            let ticket = {};

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

    onLogout() {
        BaseViewModel.logout()
            .then((response) => {

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

    hide() {
        super.hide();
    }

    onUpdateField(data) {
        if (data.id === 'avatar') {
            this.settingsViewModel.state[data.id] = data.target.files[0];
            return;
        }
        this.settingsViewModel.state[data.id] = data.value;
    }

    async onSubmit() {
        const responseProfileEdit = this.settingsViewModel.editCommand.exec();

        await responseProfileEdit
            .then((response) => {
                console.log('\n\n-----PROFILE_VIEW:ON_SUBMIT()-----');
                console.log('OK');
                console.log('-----PROFILE_VIEW:ON_SUBMIT()-----\n\n');
            })
            .catch((err) => {
                console.log('\n\n-----PROFILE_VIEW:ON_SUBMIT()-----');
                console.log('NOT OK');
                console.log('-----PROFILE_VIEW:ON_SUBMIT()-----\n\n');

                let validation = document.getElementsByClassName('validation-block')[0];
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });

        await this.show();
    }
}

export default ProfileView;
