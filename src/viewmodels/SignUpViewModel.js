import UserModel from '../models/UserModel';

/** Class that contains SignUp ViewModel */
export default class SignUpViewModel {
    /**
     * Represents SignUp ViewModel constructor
     */
    constructor() {
        this.state = new Map([
            ['login', ''],
            ['name', ''],
            ['password', ''],
            ['passwordRepeated', ''],
            ['surname', ''],
        ]);
        this.registerCommand = {exec: () => this.register()};
    }

    /**
     * Register user after filling fields.
     * @return {Promise<boolean>}
     */
    async register() {
        const userModel = new UserModel();

        userModel.login = this.state.login;
        userModel.name = this.state.name;
        userModel.surname = this.state.surname;

        if (!userModel.login ||
            !userModel.name ||
            !userModel.surname) {
            throw new Error('invalid form data');
        }

        let passwordRepeated = null;
        userModel.password = this.state.passwordRepeated;
        if (userModel.password) {
            passwordRepeated = userModel.password;
            userModel.password = this.state.password;
            if (!userModel.password || userModel.password !== passwordRepeated) {
                throw new Error('invalid form data');
            }
        } else {
            throw new Error('invalid form data');
        }

        const response = await userModel.register();
        if (response.ok) {
            return response.ok;
        }

        throw new Error('already registered');
    }
}
