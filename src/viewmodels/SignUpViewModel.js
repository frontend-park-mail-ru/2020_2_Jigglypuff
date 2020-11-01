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

        userModel.login = this.state.login;
        if (!userModel.login) {
            throw new Error('invalid form data');
        }

        const passwordRepeated = null;
        userModel.password = this.state.passwordRepeated;
        if (userModel.password) {
            userModel.password = passwordRepeated;
        } else {
            throw new Error('invalid form data');
        }
        userModel.password = this.state.password;
        if (!userModel.password || userModel.password !== passwordRepeated) {
            throw new Error('invalid form data');
        }

        return await userModel.register();
    }
}
