import UserModel from '../models/UserModel';

/** Class that contains SignIn ViewModel */
export default class SignInViewModel {
    /**
     * Represents SignIn ViewModel constructor
     */
    constructor() {
        this.state = {
            login: '',
            password: '',
        };
        this.signInCommand = {exec: () => this.signIn()};
    }

    /**
     * SignIn user after filling fields.
     * @return {Promise<Response>}
     */
    async signIn() {
        const userModel = new UserModel();

        userModel.login = this.state.login;
        if (userModel.login === undefined) {
            throw Error('invalid login or password');
        }

        userModel.password = this.state.password;
        if (userModel.password === undefined) {
            throw Error('invalid login or password');
        }

        return await userModel.signIn();
    }
}
