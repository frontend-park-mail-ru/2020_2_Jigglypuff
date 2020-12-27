import template from 'view/RegisterView/RegisterView.hbs';
import View from 'view/BaseView/View';
import RegisterContent from 'components/Profile/registerContent/registerContent';
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
    }

    /**
     * Method that shows registration view
     */
    async show() {
        if (await BaseViewModel.isAuthorised()) {
            EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
        }

        this._onUpdateField = this.onUpdateField.bind(this);
        this._onSubmit = this.onSubmit.bind(this);
        EventBus.on(Events.RegisterFieldFill, this._onUpdateField);
        EventBus.on(Events.RegisterSubmit, this._onSubmit);

        this._RegisterContent = new RegisterContent();

        const data = {
            RegisterContent: this._RegisterContent.render(),
        };
        await super.show(this._template(data));
    }

    /**
     * Method that hides registration view
     */
    hide() {
        this.off();
        super.hide();
    }

    /**
     *
     * */
    off() {
        this._RegisterContent.off();
        EventBus.off(Events.RegisterFieldFill, this._onUpdateField);
        EventBus.off(Events.RegisterSubmit, this._onSubmit);
        super.off();
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
            .then(async () => {
                EventBus.emit(Events.UpdateHeader, {isAuthorized: true, ...(await Getter.getProfile())});
                EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
            })
            .catch((err) => {
                const validation = document.getElementsByClassName('validation-block')[0];
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });
    }
}
