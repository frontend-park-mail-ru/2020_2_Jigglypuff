const Routes = {
    Host: 'https://cinemascope.space/',
    HostAPI: 'https://cinemascope.space/api',

    CinemaList: '/cinema/',
    CinemaPage: '/cinema/:id/',
    CSRF: '/csrf/',
    Hall: '/hall/:id/',
    Login: '/auth/login/',
    Logout: '/auth/logout/',
    Main: '/',
    MovieList: '/movie/',
    MoviePage: '/movie/:id/',
    MovieListActual: '/movie/actual/',
    ProfilePage: '/profile/',
    RateMovie: '/movie/rate/',
    RecommendationsList: '/recommendations/',
    Register: '/auth/register/',
    Reply: '/reply/',
    Schedule: '/schedule/',
    ScheduleID: '/schedule/:id/',
    Ticket: '/ticket/:id/',
    TicketBuy: '/ticket/buy/',
    TicketList: '/ticket/',
    TicketScheduleList: '/ticket/schedule/:id/',
    TicketPay: '/ticket/pay/',

    WSSchedule: 'ws://95.163.249.116:8080/api/ticket/ws/:id/',
};

export default Routes;
