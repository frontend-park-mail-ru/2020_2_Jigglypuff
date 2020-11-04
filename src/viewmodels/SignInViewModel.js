import UserModel from '../models/UserModel';

/** Class that contains SignIn ViewModel */
export default class SignInViewModel {
    /**
     * Represents SignIn ViewModel constructor
     */
    constructor() {
        this.state = new Map([
            ['login', ''],
            ['password', ''],
        ]);
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
