import template from './LoginView.hbs';
import View from '../BaseView/View';
import LoginContent from '../../components/loginContent/loginContent';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import SignInViewModel from '../../viewmodels/SignInViewModel';
import Routes from '../../consts/Routes';
import BaseViewModel from '../../viewmodels/BaseViewModel';

/**
 * Class of the login view
 */
export default class LoginView extends View {
    /**
     * Constructor of the login view
     * @constructor
     * @param {string} title - title of the login page
     */
    constructor(title = 'CinemaScope') {
        super(title);
        this._template = template;

        this.signInViewModel = new SignInViewModel();
        EventBus.on(Events.LoginFieldFill, this.onUpdateField.bind(this));
        EventBus.on(Events.LoginSubmit, this.onSubmit.bind(this));
    }

    /**
     * Method that shows login view
     */
    async show() {
        if (await BaseViewModel.isAuthorised()) {
            EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
        }

        const data = {
            LoginContent: (new LoginContent()).render(),
        };
        await super.show(this._template(data));
    }

    /**
     * Method that hides login view
     */
    hide() {
        super.hide();
    }

    /**
     * Method that handles input from login fields
     * @param {Object} data - contains entered data from input field
     */
    onUpdateField(data = {}) {
        if (data.event === Events.LoginFieldFill) {
            this.signInViewModel.state[data.id] = data.value;
        }
    }

    /**
     * Method that handles submitting of login form
     */
    async onSubmit() {
        const responseSignIn = this.signInViewModel.signInCommand.exec();

        await responseSignIn
            .then(() => {
                console.log('\n\n-----LOGIN_VIEW:ON_UPDATE_FIELD()-----');
                console.log('OK');
                console.log('-----LOGIN_VIEW:ON_UPDATE_FIELD()-----\n\n');

                EventBus.emit(Events.ChangePath, {path: Routes.Main});
            })
            .catch((err) => {
                const validation = document.getElementsByClassName('validation-block')[0];
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });
    }
}
