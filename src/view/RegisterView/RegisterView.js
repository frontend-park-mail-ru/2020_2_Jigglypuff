import template from './RegisterView.hbs';
import View from '../BaseView/View';
import RegisterContent from '../../components/RegisterContent/registerContent';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import SignUpViewModel from '../../viewmodels/SignUpViewModel';
import Router from '../../services/Router';
import BaseViewModel from '../../viewmodels/BaseViewModel';
import Routes from '../../consts/Routes';

class RegisterView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.template = template;
        this.signUpViewModel = new SignUpViewModel();

        EventBus.on(Events.RegisterFieldFill, this.onUpdateField.bind(this));
        EventBus.on(Events.RegisterSubmit, this.onSubmit.bind(this));
    }

    async show() {

        if (await BaseViewModel.isAuthorised()) {
            EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
        }

        const data = {
            RegisterContent: (new RegisterContent()).render(),
        };
        super.show(this.template(data));
    }
    hide() {
        super.hide();
    }

    onUpdateField(data = {}) {
        this.signUpViewModel.state[data.id] = data.value;
    }

    async onSubmit() {
        const responseSignUp = this.signUpViewModel.registerCommand.exec();

        await responseSignUp
            .then((response) => {
                console.log('\n\n-----REGISTER_VIEW:ON_SUBMIT()-----');
                console.log(response);
                console.log('OK');
                console.log('-----REGISTER_VIEW:ON_SUBMIT()-----\n\n');

                EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
            })
            .catch((err) => {
                console.log('\n\n-----REGISTER_VIEW:ON_SUBMIT()-----');
                console.log('NOT OK');
                console.log('-----REGISTER_VIEW:ON_SUBMIT()-----\n\n');

                let validation = document.getElementsByClassName('validation-block')[0];
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            })
    }

}

export default RegisterView;
