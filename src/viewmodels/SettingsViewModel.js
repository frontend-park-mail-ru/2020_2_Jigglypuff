import Extractor from '../utils/Extractor';
import UserModel from '../models/UserModel';

/** Class that contains SignIn ViewModel */
export default class SettingsViewModel {
    /**
     * Represents Settings ViewModel constructor
     */
    constructor() {
        this.state = {
            login: '',
            password: '',
            name: '',
            surname: '',
            avatar: '',
        };
        this.editCommand = {exec: () => this.edit()};
    }

    /**
     * Change user info.
     * @return {Promise<Response>}
     */
    async edit() {
        const userModel = new UserModel();

        const extractedDataMap = Extractor.extractFormData(this.state);
        for (const field of extractedDataMap) {
            userModel[field.keys()] = field.values();
        }

        return await userModel.edit();
    }
}
