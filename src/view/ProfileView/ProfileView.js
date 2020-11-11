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
        this.ticketListViewModel = new TicketListViewModel();

        EventBus.on(Events.Logout, this.onLogout.bind(this));
        EventBus.on(Events.ProfileEditFieldFill, this.onUpdateField.bind(this));
        EventBus.on(Events.UploadAvatar, this.onUpdateField.bind(this));
        EventBus.on(Events.ProfileEditSubmit, this.onSubmit.bind(this));
    }

    async show() {

        let profileContext = {
            profileEdit: {},
            profileTickets: {},
        };

        let responseTicketList = this.ticketListViewModel.getTicketListCommand.exec();
        await responseTicketList
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log('\n\n-----PROFILE_VIEW:SHOW()-----');
                console.log(err);
                console.log('-----PROFILE_VIEW:SHOW()-----\n\n');
            });

        profileContext.profileEdit = await this.getProfileEditContext();

        console.log('\n\n-----PROFILE_VIEW:SHOW()-----');
        console.log(profileContext);
        console.log('-----PROFILE_VIEW:SHOW()-----\n\n');


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

    }

    onLogout() {
        BaseViewModel.logout()
            .then((response) => {

                console.log('\n\n-----PROFILE_VIEW:ON_LOGOUT()-----');
                console.log('SUCCESS');
                console.log('-----PROFILE_VIEW:ON_LOGOUT()-----\n\n');

                EventBus.emit(Events.ChangePath, {path: '/'});
            })
            .catch((err) => {

                console.log('\n\n-----PROFILE_VIEW:ON_LOGOUT()-----');
                console.log(err);
                console.log('-----PROFILE_VIEW:ON_LOGOUT()-----\n\n');

                EventBus.emit(Events.ChangePath, {path: '/'});
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
                console.log(this.settingsViewModel.state);
                console.log('OK');
                console.log('-----PROFILE_VIEW:ON_SUBMIT()-----\n\n');
            })
            .catch((err) => {
                console.log('\n\n-----PROFILE_VIEW:ON_SUBMIT()-----');
                console.log(err);
                console.log('NOT OK');
                console.log('-----PROFILE_VIEW:ON_SUBMIT()-----\n\n');
            });

        await this.show();
    }
}

export default ProfileView;
