import UserModel from '../models/UserModel';
import BaseView from './BaseView';

/** Class that contains SignIn ViewModel */
export default class SignInViewModel extends BaseView {
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
     * @return {Promise<boolean>}
     */
    async signIn() {
        const userModel = new UserModel();

        userModel.login = this.state.login;
        userModel.password = this.state.password;

        if (!userModel.login || !userModel.password) {
            throw Error('invalid login or password');
        }

        const response = await userModel.signIn();
        if (response.ok) {
            return response.ok;
        }

        throw new Error('invalid login or password');
    }
}
