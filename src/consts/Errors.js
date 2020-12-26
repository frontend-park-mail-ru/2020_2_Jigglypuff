const Errors = {
    AlreadyRegistered: {
        errorNumber: 1,
        errorMessage: 'Аккаунт с такой почтой уже существует',
    },

    FailedToCreateReply: 2,
    FailedToGetActualMovieList: 3,
    FailedToGetCinema: 4,
    FailedToGetCinemaList: 5,
    FailedToGetHall: 6,
    FailedToGetMovieList: 7,
    FailedToGetMovie: 8,
    FailedToGetProfile: 9,
    FailedToGetReplies: 10,
    FailedToGetSchedule: 11,
    FailedToGetTicket: 12,
    FailedToGetTicketList: 13,
    FailedToGetTicketScheduleList: 14,
    FailedToLogout: 15,

    InvalidLoginOrPassword: {
        errorNumber: 16,
        errorMessage: 'Неверный логин и/или пароль',
    },
    InvalidLogin: {
        errorInputID: 'login',
        errorNumber: 17,
        errorMessage: 'Неверный формат почты',
    },
    InvalidPassword: {
        errorInputID: 'password',
        errorNumber: 18,
        errorMessage: 'Формат пароля от 4 до 20 символов латинских букв, чисел и $, !',
    },
    InvalidName: {
        errorInputID: 'name',
        errorNumber: 19,
        errorMessage: 'Формат имени: 2-57 символов A-z и А-я',
    },
    InvalidSurname: {
        errorInputID: 'surname',
        errorNumber: 20,
        errorMessage: 'Формат фамилии: 2-57 символов A-z и А-я',
    },
    InvalidPasswordRepeated: {
        errorInputID: 'passwordRepeated',
        errorNumber: 21,
        errorMessage: 'Пароли не совпадают',
    },

    ListIsEmpty: 22,

    NotAuthorised: 23,

    TransactionNonceIsAlreadyUsed: {
        errorNumber: 24,
        errorMessage: 'Транзакция уже была использована',
    },

    TransactionNotEnoughMoney: {
        errorNumber: 25,
        errorMessage: 'Недостаточно денег',
    },

    TransactionVerificationIsFailed: {
        errorNumber: 26,
        errorMessage: 'Подпись транзакции невалидна',
    },
};

export default Errors;
