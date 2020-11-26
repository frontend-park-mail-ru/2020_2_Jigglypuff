import Events from 'consts/Events';

const RegistrationItems = {
    name: {
        inputID: 'name',
        inputName: 'Имя',
        inputPlaceholder: 'Введите имя',
        inputType: 'text',
        event: Events.RegisterFieldFill,
    },
    surname: {
        inputID: 'surname',
        inputName: 'Фамилия',
        inputPlaceholder: 'Введите фамилию',
        inputType: 'text',
        event: Events.RegisterFieldFill,
    },
    login: {
        inputID: 'login',
        inputName: 'Почта',
        inputPlaceholder: 'Введите почту',
        inputType: 'text',
        event: Events.RegisterFieldFill,
    },
    password: {
        inputID: 'password',
        inputName: 'Пароль',
        inputPlaceholder: 'Введите пароль',
        inputType: 'password',
        event: Events.RegisterFieldFill,
    },
    repeatPassword: {
        inputID: 'passwordRepeated',
        inputName: 'Повторите пароль',
        inputPlaceholder: 'Повторите пароль',
        inputType: 'password',
        event: Events.RegisterFieldFill,
    },
};

export default RegistrationItems;
