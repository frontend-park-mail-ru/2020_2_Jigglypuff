import Routes from 'consts/Routes';
import Events from 'consts/Events';

const headerItems = {
    url: Routes.Main,
    event: Events.ChangePath,
    headerLinks: {
        films: {
            name: 'Фильмы',
            url: Routes.Main,
            event: Events.ChangePath,
        },
        theatres: {
            name: 'Кинотеатры',
            url: Routes.CinemaList,
            event: Events.ChangePath,
        },
    },
};

export default headerItems;
