import BaseViewModel from './BaseViewModel';
import Errors from '../consts/Errors';
import Extractor from '../utils/Extractor';
import UserModel from '../models/UserModel';

/** Class that contains SignIn ViewModel */
export default class SettingsViewModel extends BaseViewModel {
    /**
     * Represents Settings ViewModel constructor
     */
    constructor() {
        super();

        this._userModel = new UserModel();
        this.state = {
            login: '',
            name: '',
            surname: '',
            avatar: '',
            pathToAvatar: '',
        };
        this.editCommand = {exec: () => this.edit()};
    }

    /**
     * Change user info.
     * @return {Promise<Error>|Promise<bool>}
     */
    async edit() {
        const responseGetProfile = await this.getProfile();

        if (!responseGetProfile.ok) {
            throw new Error(Errors.FailedToGetProfile);
        }

        const extractedDataMap = Extractor.extractFormData(this.state);
        extractedDataMap.forEach((value, key) => {
            this._userModel[key] = value;
        });

        const responseEdit = await this._userModel.edit();

        return responseEdit.ok;
    }

    /**
     * Get user info.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getProfile() {
        const response = await this._userModel.get();

        if (response.ok) {
            const extractedProfileDataMap = Extractor.extractProfileDataFromModel(this._movieModel);
            extractedProfileDataMap.forEach((value, key) => {
                this.state[key] = value;
            });

            return this.state;
        }

        throw new Error(Errors.NotAuthorised);
    }
}
