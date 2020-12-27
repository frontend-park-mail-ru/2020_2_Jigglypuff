import Events from 'consts/Events';
import Routes from 'consts/Routes';

const ProfileNavigationItems = {
    fields: [
        {
            id: 'settings',
            title: 'Настройки',
            event: Events.GoToProfileBlock,
        },
        {
            id: 'history',
            title: 'История заказы',
            event: Events.GoToProfileBlock,
        },
        {
            id: 'current',
            title: 'Текущие заказы',
            event: Events.GoToProfileBlock,
        },
    ],
    exit: {
        title: 'Выйти',
        url: Routes.Logout,
        event: Events.Logout,
    },
};

export default ProfileNavigationItems;
