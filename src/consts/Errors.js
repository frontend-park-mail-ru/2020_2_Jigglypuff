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
    FailedToGetSchedule: 9,
    FailedToGetTicket: 10,
    FailedToGetTicketList: 11,
    FailedToGetTicketScheduleList: 12,
    FailedToLogout: 13,

    InvalidLoginOrPassword: {
        errorNumber: 14,
        errorMessage: 'Неверный логин и/или пароль',
    },
    InvalidLogin: {
        errorInputID: 'login',
        errorNumber: 15,
        errorMessage: 'Неверный формат почты',
    },
    InvalidPassword: {
        errorInputID: 'password',
        errorNumber: 16,
        errorMessage: 'Неверный формат пароля',
    },
    InvalidName: {
        errorInputID: 'name',
        errorNumber: 17,
        errorMessage: 'Неверный формат имени',
    },
    InvalidSurname: {
        errorInputID: 'surname',
        errorNumber: 18,
        errorMessage: 'Неверный формат фамилии',
    },
    InvalidPasswordRepeated: {
        errorInputID: 'passwordRepeated',
        errorNumber: 19,
        errorMessage: 'Пароли не совпадают',
    },

    ListIsEmpty: 20,

    NotAuthorised: 21,

    TransactionNonceIsAlreadyUsed: {
        errorNumber: 22,
        errorMessage: 'Nonce уже была использована',
    },

    TransactionNotEnoughMoney: {
        errorNumber: 23,
        errorMessage: 'Недостаточно денег',
    },

    TransactionVerificationIsFailed: {
        errorNumber: 24,
        errorMessage: 'Подпись транзакции невалидна',
    },
};

export default Errors;
