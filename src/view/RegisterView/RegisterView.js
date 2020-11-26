import template from 'view/RegisterView/RegisterView.hbs';
import View from 'view/BaseView/View';
import RegisterContent from 'components/registerContent/registerContent';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import SignUpViewModel from 'viewmodels/SignUpViewModel';
import BaseViewModel from 'viewmodels/BaseViewModel';
import Routes from 'consts/Routes';
import Getter from 'utils/Getter';

/**
 * Class of the registration view
 */
export default class RegisterView extends View {
    /**
     * Constructor of the registration view
     * @constructor
     * @param {string} title - title of the registration page
     */
    constructor(title = 'CinemaScope') {
        super(title);
        this._template = template;
        this._signUpViewModel = new SignUpViewModel();

        EventBus.on(Events.RegisterFieldFill, this.onUpdateField.bind(this));
        EventBus.on(Events.RegisterSubmit, this.onSubmit.bind(this));
    }

    /**
     * Method that shows registration view
     */
    async show() {
        if (await BaseViewModel.isAuthorised()) {
            EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
        }

        const data = {
            RegisterContent: (new RegisterContent()).render(),
        };
        await super.show(this._template(data));
    }

    /**
     * Method that hides registration view
     */
    hide() {
        super.hide();
    }

    /**
     * Method that handles input from registration fields
     * @param {Object} data - contains entered data from input field
     */
    onUpdateField(data = {}) {
        this._signUpViewModel.state[data.id] = data.value;
    }

    /**
     * Method that handles submitting of registration form
     */
    async onSubmit() {
        const responseSignUp = this._signUpViewModel.registerCommand.exec();

        await responseSignUp
            .then(async (response) => {
                console.log('\n\n-----REGISTER_VIEW:ON_SUBMIT()-----');
                console.log(response);
                console.log('OK');
                console.log('-----REGISTER_VIEW:ON_SUBMIT()-----\n\n');

                EventBus.emit(Events.UpdateHeader, {isAuthorized: true, ...(await Getter.getProfile())});
                EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
            })
            .catch((err) => {
                console.log('\n\n-----REGISTER_VIEW:ON_SUBMIT()-----');
                console.log('NOT OK');
                console.log('-----REGISTER_VIEW:ON_SUBMIT()-----\n\n');

                const validation = document.getElementsByClassName('validation-block')[0];
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });
    }
}
