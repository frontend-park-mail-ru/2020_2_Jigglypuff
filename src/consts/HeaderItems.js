import Routes from './Routes';
import Events from './Events';

const headerItems = {
    url: Routes.Main,
    event: Events.ChangePath,
    headerLinks: {
        films: {
            id: 'film_premiers',
            name: 'Фильмы',
            url: Routes.Main,
            event: Events.ChangePath,
        },
        theatres: {
            id: 'header-theatres',
            name: 'Кинотеатры',
            url: Routes.CinemaList,
            event: Events.ChangePath,
        },
    },
};

export default headerItems;
