import Events from 'consts/Events';

const LoginItems = {
    login: {
        inputID: 'login',
        inputName: 'Почта',
        inputPlaceholder: 'Введите почту',
        inputType: 'text',
        event: Events.LoginFieldFill,
    },
    password: {
        inputID: 'password',
        inputName: 'Пароль',
        inputPlaceholder: 'Введите пароль',
        inputType: 'password',
        event: Events.LoginFieldFill,
    },
};

export default LoginItems;
