/** Class that contains validation methods */
export default class Validator {
    /**
     * Represents login validation.
     * @return {boolean} true - if login is valid
     * @param {string} login
     */
    static validateLogin(login) {
        const regExp = /^[a-zA-Z][\w]{4, 18}$/;
        return regExp.test(String(login));
    }

    /**
     * Represents password validation.
     * @return {boolean} true - if password is valid
     * @param {string} password
     */
    static validatePassword(password) {
        const regExp = /^[$\w]{4, 20}$/;
        return regExp.test(String(password));
    }

    /**
     * Represents email validation.
     * @return {boolean} true - if email is valid
     * @param {string} email
     */
    static validateEmail(email) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(String(email).toLowerCase());
    }

    /**
     * Represents name and surname validation.
     * @return {boolean} true - if name is valid
     * @param {string} name
     */
    static validateName(name) {
        const regExp = /^[A-Za-zА-Яа-я]$/;
        return regExp.test(String(name));
    }

    /**
     * Represents movie name validation.
     * @return {boolean} true - if movie name is valid
     * @param {string} movieName
     */
    static validateMovieName(movieName) {
        const regExp = /^[A-Za-zА-Яа-я\w]{1, 50}$/;
        return regExp.test(String(movieName));
    }

    /**
     * Represents movie description validation.
     * @return {boolean} true - if movie description is valid
     * @param {string} movieDescription
     */
    static validateMovieDescription(movieDescription) {
        const regExp = /^[A-Za-zА-Яа-я\w]{1, 500}$/;
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
     * Represents movie genre validation.
     * @return {boolean} true - if movie genre is valid
     * @param {string} movieGenre
     */
    static validateMovieGenre(movieGenre) {
        const regExp = /^[A-Za-zА-Яа-я\w]{1, 500}$/;
        return regExp.test(String(movieGenre));
    }
}
