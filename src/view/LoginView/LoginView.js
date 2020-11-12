import template from './LoginView.hbs';
import View from '../BaseView/View';
import LoginContent from '../../components/loginContent/loginContent';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import Router from '../../services/Router';
import SignInViewModel from '../../viewmodels/SignInViewModel';

class LoginView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.template = template;

        this.signInViewModel = new SignInViewModel();
        EventBus.on(Events.LoginFieldFill, this.onUpdateField.bind(this));
        EventBus.on(Events.LoginSubmit, this.onSubmit.bind(this));
    }

    show() {
        const data = {
            LoginContent: (new LoginContent()).render(),
        };
        super.show(this.template(data));
    }

    hide() {
        super.hide();
    }

    onUpdateField(data = {}) {
        if (data.event === Events.LoginFieldFill) {
            this.signInViewModel.state[data.id] = data.value;
        }
    }

    async onSubmit(data = {}) {
        if (data.event !== Events.LoginSubmit) {
            return;
        }
        const responseSignIn = this.signInViewModel.signInCommand.exec();

        await responseSignIn
            .then((response) => {

                console.log('\n\n-----LOGIN_VIEW:ON_UPDATE_FIELD()-----');
                console.log('OK');
                console.log('-----LOGIN_VIEW:ON_UPDATE_FIELD()-----\n\n');

            })
            .catch((err) => {

                console.log('\n\n-----LOGIN_VIEW:ON_UPDATE_FIELD()-----');
                console.log(err);
                console.log('NOT OK');
                console.log('-----LOGIN_VIEW:ON_UPDATE_FIELD()-----\n\n');

            });
        let routeData = {};
        routeData.path = '/';
        EventBus.emit(Events.ChangePath, routeData);
    }
}

export default LoginView;
