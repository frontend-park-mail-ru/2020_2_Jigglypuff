import UserModel from '../models/UserModel';

/** Class that contains SignUp ViewModel */
export default class SignUpViewModel {
    /**
     * Represents SignUp ViewModel constructor
     */
    constructor() {
        this.state = {
            login: '',
            password: '',
            passwordRepeated: '',
        };
        this.registerCommand = {exec: () => this.register()};
    }

    /**
     * Register user after filling fields.
     * @return {Promise<Response>}
     */
    async register() {
        const userModel = new UserModel();
        const promise = new Promise((resolve, reject) => {
            reject(new Error('invalid form data'));
        });

        userModel.login = this.state.login;
        if (userModel.login === undefined) {
            return promise;
        }

        const passwordRepeated = undefined;
        userModel.password = this.state.passwordRepeated;
        if (userModel.password !== undefined) {
            userModel.password = passwordRepeated;
        } else {
            return promise;
        }
        userModel.password = this.state.password;
        if (userModel.password === undefined || userModel.password !== passwordRepeated) {
            return promise;
        }

        return await userModel.register();
    }
}
