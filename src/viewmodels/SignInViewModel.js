import BaseViewModel from './BaseViewModel';
import Errors from '../consts/Errors';
import UserModel from '../models/UserModel';

/** Class that contains SignIn ViewModel */
export default class SignInViewModel extends BaseViewModel {
    /**
     * Represents SignIn ViewModel constructor
     */
    constructor() {
        super();

        this.state = {
            'login': '',
            'password': '',
        };
        this.signInCommand = {exec: () => this.signIn()};
    }

    /**
     * SignIn user after filling fields.
     * @return {Promise<Error>|Promise<boolean>}
     */
    async signIn() {
        const userModel = new UserModel();

        userModel.login = this.state.login;
        userModel.password = this.state.password;

        if (!userModel.login || !userModel.password) {
            throw Error(Errors.InvalidLoginOrPassword);
        }

        const response = await userModel.signIn();
        if (response.ok) {
            return response.ok;
        }

        throw Error(Errors.InvalidLoginOrPassword);
    }
}
