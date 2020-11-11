import Events from './Events';

const LoginItems = {
    login: {
        inputID: 'login',
        inputName: 'Логин',
        inputPlaceholder: 'Введите логин',
        inputPattern: '[A-Za-z0-9]*',
        inputErrorMessage: 'Введи логин, дядя',
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
