import Events from './Events';

const ProfileEditItems = {
    name: {
        inputID: 'name',
        inputName: 'Имя',
        inputType: 'text',
        event: Events.ProfileEditFieldFill,
    },
    surname: {
        inputID: 'surname',
        inputName: 'Фамилия',
        inputType: 'text',
        event: Events.ProfileEditFieldFill,
    },
    login: {
        inputID: 'login',
        inputName: 'Логин',
        inputErrorMessage: 'Введи почту, дурачок',
        inputType: 'email',
        event: Events.ProfileEditFieldFill,
    },
    avatar: {
        inputID: 'avatar',
        inputName: 'Аватар',
        inputPlaceholder: 'Загрузите аватар',
        inputErrorMessage: 'Загружай изображение, Вася...',
        pathToAvatar: '/static/NoAvatar.jpg',
        event: Events.ProfileEditFieldFill,
    },
};

export default ProfileEditItems;
