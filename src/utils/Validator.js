import Checker from 'Checker';

/** Class that contains validation methods */
export default class Validator {
    /**
     * Represents login validation.
     * @return {boolean} true - if login is valid
     * @param {string} login
     */
    static validateLogin(login) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(String(login).toLowerCase());
    }

    /**
     * Represents password validation.
     * @return {boolean} true - if password is valid
     * @param {string} password
     */
    static validatePassword(password) {
        const regExp = /^[$!\w]{4,20}$/;
        return regExp.test(String(password));
    }

    /**
     * Represents name and surname validation.
     * @return {boolean} true - if name is valid
     * @param {string} name
     */
    static validateName(name) {
        const regExp = /^[A-Za-zА-Яа-я]{3,57}$/;
        return regExp.test(String(name));
    }

    /**
     * Represents movie name validation.
     * @return {boolean} true - if movie name is valid
     * @param {string} movieName
     */
    static validateMovieName(movieName) {
        const regExp = /^[А-Яа-яA-Za-z\w\s.…]{1,100}$/;
        return regExp.test(String(movieName));
    }

    /**
     * Represents movie description validation.
     * @return {boolean} true - if movie description is valid
     * @param {string} movieDescription
     */
    static validateMovieDescription(movieDescription) {
        const regExp = /^[А-Яа-я\w\s]{1,500}$/;
        return regExp.test(String(movieDescription));
    }

    /**
     * Represents movie age limit validation.
     * @return {boolean} true - if movie age limit is valid
     * @param {int} movieAgeLimit
     */
    static validateMovieAgeLimit(movieAgeLimit) {
        if (Number.isInteger(movieAgeLimit)) {
            if ((movieAgeLimit >= 0) && (movieAgeLimit < 150)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Represents movie duration validation.
     * Duration is calculated in minutes.
     * @return {boolean} true - if movie age limit is valid
     * @param {int} movieDuration
     */
    static validateMovieDuration(movieDuration) {
        if (Number.isInteger(movieDuration)) {
            if ((movieDuration > 0) && (movieDuration < 1000)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Represents movie rating validation.
     * @return {boolean} true - if movie rating is valid
     * @param {float} movieRating
     */
    static validateMovieRating(movieRating) {
        if (Checker.isFloat(movieRating)) {
            if ((movieRating >= 0) && (movieRating <= 10)) {
                return true;
            }
        }
        return Number(movieRating) === 0;
    }

    /**
     * Represents movie user rating validation.
     * @return {boolean} true - if movie user rating is valid
     * @param {int} movieUserRating
     */
    static validateMovieRatingUser(movieUserRating) {
        if (Number.isInteger(movieUserRating)) {
            if ((movieUserRating >= 0) && (movieUserRating < 11)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Represents movie year validation.
     * @return {boolean} true - if movie year is valid
     * @param {int} movieYear
     */
    static validateMovieYear(movieYear) {
        if (Number.isInteger(movieYear)) {
            if ((movieYear >= 1895) && (movieYear < 2100)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Represents text validation.
     * @return {boolean} true - if text is valid
     * @param {string} text
     */
    static validateText(text) {
        const regExp = /^[А-Яа-я\w\s]{10,5000}$/;
        return regExp.test(String(text));
    }

    /**
     * Represents unsigned int validation.
     * @return {*}
     * @param {string} number
     */
    static validateUINT(number) {
        return Checker.isUINT(number);
    }

    /**
     * Represents cinema name validation.
     * @return {boolean} true - if cinema name is valid
     * @param {string} cinemaName
     */
    static validateCinemaName(cinemaName) {
        const regExp = /^[А-Яа-я\w]{1,50}$/;
        return regExp.test(String(cinemaName));
    }

    /**
     * Represents address validation.
     * @return {boolean} true - if address is valid
     * @param {string} address
     */
    static validateAddress(address) {
        const regExp = /^[А-Яа-я\w\s.,]{1,50}$/;
        return regExp.test(String(address));
    }
}
