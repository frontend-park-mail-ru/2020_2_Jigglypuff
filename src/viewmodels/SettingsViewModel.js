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
            name: '',
            surname: '',
            avatarPath: '',
        };
        this.editCommand = {exec: () => this.edit()};
    }

    /**
     * Change user info.
     * @return {Promise<Response>}
     */
    async edit() {
        const response = await this.getProfile();
        if (response.statusCode !== response.status.HTTP_STATUS_OK) {
            throw new Error('failed to get profile');
        }

        const userModel = new UserModel();

        const extractedDataMap = Extractor.extractFormData(this.state);
        for (const field of extractedDataMap) {
            userModel[field.keys()] = field.values();
        }

        return await userModel.edit();
    }

    /**
     * Get user info.
     * @return {Promise<Response>}
     */
    async getProfile() {
        const userModel = new UserModel();
        const response = userModel.get();

        const statusCode = response.json().statusCode;

        if (statusCode === response.status.HTTP_STATUS_OK) {
            this.state.login = userModel.login;
            this.state.name = userModel.name;
            this.state.surname = userModel.surname;
            this.state.avatarPath = userModel.avatarPath;
        }

        return await response.json();
    }
}
