import Validator from '../utils/Validator';
import Checker from '../utils/Checker';

/** Class that contains User model */
export default class UserModel {
    /**
     * Declare UserModel attributes.
     */
    constructor() {
        this._login = null;
        this._password = null;
        this._name = null;
        this._surname = null;
        this._avatar = null;
        this._avatarPath = null;
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
     * Get user avatar path.
     * @return {null} {string}
     */
    get avatarPath() {
        return this._avatarPath;
    }

    /**
     * Get user status info.
     * @return {null} {string}
     */
    get isPremium() {
        return this._isPremuim;
    }

    /**
     * Set user login to "login" variable value if valid else, null.
     * @param {any} login
     */
    set login(login) {
        if (Validator.validateLogin(login)) {
            this._login = login.toString();
        } else {
            this._login = null;
        }
    }

    /**
     * Set user password to "password" variable value if valid else, null.
     * @param {any} password
     */
    set password(password) {
        if (Validator.validatePassword(password)) {
            this._password = password.toString();
        } else {
            this._password = null;
        }
    }

    /**
     * Set user name to "name" variable value if valid else, null.
     * @param {any} name
     */
    set name(name) {
        if (Validator.validateName(name)) {
            this._name = name.toString();
        } else {
            this._name = null;
        }
    }

    /**
     * Set user surname to "surname" variable value if valid else, null.
     * @param {any} surname
     */
    set surname(surname) {
        if (Validator.validateName(surname)) {
            this._surname = surname.toString();
        } else {
            this._surname = null;
        }
    }

    /**
     * Set user avatar to "avatar" variable value
     * @param {any} avatar
     */
    set avatar(avatar) {
        if (Checker.isImage(avatar)) {
            this._avatar = avatar;
        } else {
            this._avatar = null;
        }
    }

    /**
     * Set user path to avatar to "avatarPath" variable value if valid else.
     * @param {any} avatarPath
     */
    set avatarPath(avatarPath) {
        this._avatarPath = avatarPath.toString();
    }

    /**
     * Register user.
     * @return {Promise<Response>}
     */
    async register() {
        const response = await fetch('http://cinemascope.space/auth/register/', {
            method: 'POST',
            body: JSON.stringify({'login': this._login.toString(), 'password': this._password.toString()}),
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
        const response = await fetch('http://cinemascope.space/auth/login/', {
            method: 'POST',
            body: JSON.stringify({'login': this._login.toString(), 'password': this._password.toString()}),
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

        const response = await fetch('http://cinemascope.space/profile/', {
            method: 'PUT',
            body: new FormData(profileSettingsForm),
        });

        return await response.json();
    }

    /**
     * Get user.
     * @return {Promise<Response>}
     */
    async get() {
        const response = await fetch('http://cinemascope.space/profile/', {
            method: 'GET',
        });

        return await response.json();
    }

    /**
     * Logout user.
     * @return {Promise<Response>}
     */
    async logout() {
        const response = await fetch('http://cinemascope.space/auth/logout/', {
            method: 'POST',
        });

        return await response.json();
    }
}
