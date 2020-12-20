const Errors = {
    AlreadyRegistered: {
        errorNumber: 1,
        errorMessage: 'Аккаунт с такой почтой уже существует',
    },

    FailedToGetActualMovieList: 2,
    FailedToGetCinema: 3,
    FailedToGetCinemaList: 4,
    FailedToGetHall: 5,
    FailedToGetMovieList: 6,
    FailedToGetMovie: 7,
    FailedToGetProfile: 8,
    FailedToGetReplies: 9,
    FailedToGetSchedule: 10,
    FailedToGetTicket: 11,
    FailedToGetTicketList: 12,
    FailedToGetTicketScheduleList: 13,
    FailedToLogout: 14,

    InvalidLoginOrPassword: {
        errorNumber: 15,
        errorMessage: 'Неверный логин и/или пароль',
    },
    InvalidLogin: {
        errorInputID: 'login',
        errorNumber: 16,
        errorMessage: 'Неверный формат почты',
    },
    InvalidPassword: {
        errorInputID: 'password',
        errorNumber: 17,
        errorMessage: 'Неверный формат пароля',
    },
    InvalidName: {
        errorInputID: 'name',
        errorNumber: 18,
        errorMessage: 'Неверный формат имени',
    },
    InvalidSurname: {
        errorInputID: 'surname',
        errorNumber: 19,
        errorMessage: 'Неверный формат фамилии',
    },
    InvalidPasswordRepeated: {
        errorInputID: 'passwordRepeated',
        errorNumber: 20,
        errorMessage: 'Пароли не совпадают',
    },

    ListIsEmpty: 21,

    NotAuthorised: 22,

    TransactionNonceIsAlreadyUsed: {
        errorNumber: 23,
        errorMessage: 'Nonce уже была использована',
    },

    TransactionNotEnoughMoney: {
        errorNumber: 24,
        errorMessage: 'Недостаточно денег',
    },

    TransactionVerificationIsFailed: {
        errorNumber: 25,
        errorMessage: 'Подпись транзакции невалидна',
    },
};

export default Errors;
