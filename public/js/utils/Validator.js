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
}
