import Validator from '../utils/Validator';

/** Class that contains User model */
export default class UserModel {
    /**
     * Declare UserModel attributes.
     */
    constructor() {
        this._login = null;
        this._email = null;
        this._password = null;
        this._name = null;
        this._surname = null;
        this._avatar = null;
        this._isPremuim = null;
    }

    /**
     * Get user login.
     * @return {null} {string}
     */
    get login() {
        return this._login;
    }

    /**
     * Get user email.
     * @return {null} {string}
     */
    get email() {
        return this._email;
    }

    /**
     * Get user password.
     * @return {null} {string}
     */
    get password() {
        return this._password;
    }

    /**
     * Get user name.
     * @return {null} {string}
     */
    get name() {
        return this._name;
    }

    /**
     * Get user surname.
     * @return {null} {string}
     */
    get surname() {
        return this._surname;
    }

    /**
     * Get user avatar.
     * @return {null} {string}
     */
    get avatar() {
        return this._avatar;
    }

    /**
     * Get user status info.
     * @return {null} {string}
     */
    get isPremium() {
        return this._isPremuim;
    }

    /**
     * Set user login to "login" variable value if valid else, undefined.
     * @param {any} login
     */
    set login(login) {
        if (Validator.validateLogin(login)) {
            this._login = login.toString();
        } else {
            this._login = undefined;
        }
    }

    /**
     * Set user email to "email" variable value if valid else, undefined.
     * @param {any} email
     */
    set email(email) {
        if (Validator.validateEmail(email)) {
            this._email = email.toString();
        } else {
            this._email = undefined;
        }
    }

    /**
     * Set user password to "password" variable value if valid else, undefined.
     * @param {any} password
     */
    set password(password) {
        if (Validator.validatePassword(password)) {
            this._password = password.toString();
        } else {
            this._password = undefined;
        }
    }

    /**
     * Set user name to "name" variable value if valid else, undefined.
     * @param {any} name
     */
    set name(name) {
        if (Validator.validateName(name)) {
            this._name = name.toString();
        } else {
            this._name = undefined;
        }
    }

    /**
     * Set user surname to "surname" variable value if valid else, undefined.
     * @param {any} surname
     */
    set surname(surname) {
        if (Validator.validateName(surname)) {
            this._surname = surname.toString();
        } else {
            this._surname = undefined;
        }
    }

    /**
     * Register user.
     * @return {Promise<Response>}
     */
    async register() {
        const response = await fetch('http://cinemascope.space/signup/', {
            method: 'POST',
            body: '{"Login":"' + this._login + '", "Password":"' + this._password + '"}',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }


    /**
     * Sign In user.
     * @return {Promise<Response>}
     */
    async signIn() {
        const response = await fetch('http://cinemascope.space/signin/', {
            method: 'POST',
            body: '{"Login":"' + this._login + '", "Password":"' + this._password + '"}',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    /**
     * Create form of user profile fields for POST request.
     * @return {FormData}
     * @private
     */
    _createFormData() {
        const formData = new FormData();
        const data = {
            'name': this._name,
            'surname': this._surname,
            'email': this._email,
            'avatar': this._avatar,
            'login': this._login,
            'password': this._password,
        };
        formData.append('data', JSON.stringify(data));

        return formData;
    }

    /**
     * Edit user profile.
     * @return {Promise<Response>}
     */
    async edit() {
        const profileSettingsForm = this._createFormData();

        const response = await fetch('http://cinemascope.space/updateprofile/', {
            method: 'POST',
            body: new FormData(profileSettingsForm),
            credentials: 'include',
        });

        return await response.json();
    }

    /**
     * Get user.
     * @return {Promise<Response>}
     */
    async get() {
        const response = await fetch('http://cinemascope.space/getprofile/', {
            method: 'GET',
            credentials: 'include',
        });

        return await response.json();
    }

    /**
     * Logout user.
     * @return {Promise<void>}
     */
    async logout() {

    }
}
