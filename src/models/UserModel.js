import Checker from '../utils/Checker';
import Routes from '../consts/Routes';
import Validator from '../utils/Validator';

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
     * @return {null|string}
     */
    get login() {
        return this._login;
    }

    /**
     * Get user password.
     * @return {null|string}
     */
    get password() {
        return this._password;
    }

    /**
     * Get user name.
     * @return {null|string}
     */
    get name() {
        return this._name;
    }

    /**
     * Get user surname.
     * @return {null|string}
     */
    get surname() {
        return this._surname;
    }

    /**
     * Get user avatar path.
     * @return {null|string}
     */
    get avatarPath() {
        return this._avatarPath;
    }

    /**
     * Get user status info.
     * @return {null|string}
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
        return await fetch(Routes.Host + Routes.Register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'login': this._login.toString(),
                'name': this._name.toString(),
                'password': this._password.toString(),
                'surname': this._surname.toString(),
            }),
        });
    }

    /**
     * Sign In user.
     * @return {Promise<Response>}
     */
    async signIn() {
        return await fetch(Routes.Host + Routes.Login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'login': this._login.toString(), 'password': this._password.toString()}),
        });
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

        return await fetch(Routes.Host + Routes.ProfilePage, {
            method: 'PUT',
            body: profileSettingsForm,
        });
    }

    /**
     * Get user.
     * @return {Promise<Response>}
     */
    async get() {
        const response = await fetch(Routes.Host + Routes.ProfilePage, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            this._name = data['Name'];
            this._surname = data['Surname'];
            this._avatarPath = data['AvatarPath'];
        }

        return response;
    }

    /**
     * Logout user.
     * @return {Promise<Response>}
     */
    async logout() {
        return await fetch(Routes.Host + Routes.Logout, {
            method: 'POST',
        });
    }
}
