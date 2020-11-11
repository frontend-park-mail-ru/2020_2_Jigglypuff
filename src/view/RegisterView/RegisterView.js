import template from './RegisterView.hbs';
import View from '../BaseView/View';
import RegisterContent from '../../components/RegisterContent/registerContent';
import EventBus from '../../services/EventBus';
import Events from '../../consts/Events';
import SignUpViewModel from '../../viewmodels/SignUpViewModel';
import Router from '../../services/Router';

class RegisterView extends View {
    constructor(title = 'CinemaScope', context = {}) {
        super(title, context);
        this.template = template;
        this.signUpViewModel = new SignUpViewModel();

        EventBus.on(Events.RegisterFieldFill, this.onUpdateField.bind(this));
        EventBus.on(Events.RegisterSubmit, this.onSubmit.bind(this));
    }

    show() {
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
            })
            .catch((err) => {
                console.log('\n\n-----REGISTER_VIEW:ON_SUBMIT()-----');
                console.log(err);
                console.log('NOT OK');
                console.log('-----REGISTER_VIEW:ON_SUBMIT()-----\n\n');
            })

        EventBus.emit(Events.ChangePath, {path: '/'});
    }

}

export default RegisterView;
