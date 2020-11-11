import Routes from './Routes';
import Events from './Events';

const headerItems = {
    logo: '/static/img/logo.svg',
    headerLinks: {
        films: {
            id: 'film_premiers',
            name: 'Фильмы',
            url: '/',
            event: Events.ChangePath,
        },
        theatres: {
            id: 'header-theatres',
            name: 'Кинотеатры',
            url: '/cinema/',
            event: Events.ChangePath,
        },
    },
};

export default headerItems;
