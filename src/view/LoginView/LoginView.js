import template from 'view/LoginView/LoginView.hbs';
import View from 'view/BaseView/View';
import LoginContent from 'components/loginContent/loginContent';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import SignInViewModel from 'viewmodels/SignInViewModel';
import Routes from 'consts/Routes';
import BaseViewModel from 'viewmodels/BaseViewModel';
import Getter from 'utils/Getter';

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
    }

    /**
     * Method that shows login view
     */
    async show() {
        if (await BaseViewModel.isAuthorised()) {
            EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
        }

        this._onLoginFieldFillHandler = this.onUpdateField.bind(this);
        this._onLoginSubmitHandler = this.onSubmit.bind(this);

        EventBus.on(Events.LoginFieldFill, this._onLoginFieldFillHandler);
        EventBus.on(Events.LoginSubmit, this._onLoginSubmitHandler);

        const data = {
            LoginContent: (new LoginContent()).render(),
        };
        await super.show(this._template(data));
    }

    /**
     * Method that hides login view
     */
    hide() {
        EventBus.off(Events.LoginFieldFill, this._onLoginFieldFillHandler);
        EventBus.off(Events.LoginSubmit, this._onLoginSubmitHandler);

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
            .then(async () => {
                console.log('\n\n-----LOGIN_VIEW:ON_UPDATE_FIELD()-----');
                console.log('OK');
                console.log('-----LOGIN_VIEW:ON_UPDATE_FIELD()-----\n\n');

                EventBus.emit(Events.UpdateHeader, {isAuthorized: true, ...(await Getter.getProfile())});
                EventBus.emit(Events.ChangePath, {path: Routes.Main});
            })
            .catch((err) => {
                const validation = document.querySelector('.validation-block');
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });
    }
}
