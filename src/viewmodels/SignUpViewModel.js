import BaseViewModel from 'viewmodels/BaseViewModel';
import CSRF from 'utils/CSRF';
import Errors from 'consts/Errors';
import UserModel from 'models/UserModel';

/** Class that contains SignUp ViewModel */
export default class SignUpViewModel extends BaseViewModel {
    /**
     * Represents SignUp ViewModel constructor
     */
    constructor() {
        super();

        this.state = {
            login: '',
            name: '',
            password: '',
            passwordRepeated: '',
            surname: '',
        };
        this.registerCommand = {exec: () => this.register()};
    }

    /**
     * Register user after filling fields.
     * @return {Promise<Error>|Promise<boolean>}
     */
    async register() {
        const userModel = new UserModel();

        userModel.login = this.state.login;
        if (!userModel.login) {
            throw new Error(Errors.InvalidLogin.errorMessage);
        }

        userModel.name = this.state.name;
        if (!userModel.name) {
            throw new Error(Errors.InvalidName.errorMessage);
        }

        userModel.surname = this.state.surname;
        if (!userModel.surname) {
            throw new Error(Errors.InvalidSurname.errorMessage);
        }

        let passwordRepeated = null;
        userModel.password = this.state.passwordRepeated;
        if (userModel.password) {
            passwordRepeated = userModel.password;
            userModel.password = this.state.password;
            if (!userModel.password || userModel.password !== passwordRepeated) {
                throw new Error(Errors.InvalidPasswordRepeated.errorMessage);
            }
        } else {
            throw new Error(Errors.InvalidPassword.errorMessage);
        }

        const response = await userModel.register();
        console.log(response);
        if (response.ok) {
            const responseCSRF = await CSRF.getCSRF();
            return response.ok & responseCSRF.ok;
        }

        throw new Error(Errors.AlreadyRegistered.errorMessage);
    }
}
