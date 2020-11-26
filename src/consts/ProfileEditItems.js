import Events from 'consts/Events';

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
    // login: {
    //     inputID: 'login',
    //     inputName: 'Почта',
    //     inputType: 'text',
    //     event: Events.ProfileEditFieldFill,
    // },
    avatar: {
        inputID: 'avatar',
        inputName: 'Аватар',
        inputPlaceholder: 'Загрузите аватар',
        pathToAvatar: '/static/NoAvatar.jpg',
        event: Events.ProfileEditFieldFill,
    },
};

export default ProfileEditItems;
