import Events from 'consts/Events';
import Routes from "consts/Routes";

const ProfileNavigationItems = {
    fields: [
        {
            title: 'Настройки',
            event: Events.ChangePath,
            url: Routes.ProfilePage,
        },
        {
            title: 'История покупок',
            event: Events.ChangePath,
            url: Routes.ProfilePage,
        },
        {
            title: 'Текущие заказ',
            event: Events.ChangePath,
            url: Routes.ProfilePage,
        },
    ],
    exit: {
        title: 'Выйти',
        url: Routes.Logout,
        event: Events.Logout,
    },
};

export default ProfileNavigationItems;
