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
        const promise = new Promise((resolve, reject) => {
            reject(new Error('invalid login or password'));
        });

        userModel.login = this.state.login;
        if (userModel.login === undefined) {
            return promise;
        }

        userModel.password = this.state.password;
        if (userModel.password === undefined) {
            return promise;
        }

        return await userModel.signIn();
    }
}
