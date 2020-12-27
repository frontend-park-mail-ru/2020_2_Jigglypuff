import BaseViewModel from 'viewmodels/BaseViewModel';
import Errors from 'consts/Errors';
import Extractor from 'utils/Extractor';
import UserModel from 'models/UserModel';

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
            id: '',
        };
        this.editCommand = {exec: () => this.edit()};
    }

    /**
     * Change user info.
     * @return {Promise<Error>|Promise<boolean>}
     */
    async edit() {
        if (!this.state.name && !this.state.surname && !this.state.avatar) {
            throw new Error('Введите новые данные');
        }
        const extractedDataMap = Extractor.extractSettingsFormData(this.state);
        extractedDataMap.forEach((value, key) => {
            this._userModel[key] = value;
        });

        if (!this._userModel.name) {
            if (!this.state.surname && !this.state.avatar) {
                throw new Error(Errors.InvalidName.errorMessage);
            }
        }
        if (!this._userModel.surname) {
            if (!this.state.name && !this.state.avatar) {
                throw new Error(Errors.InvalidSurname.errorMessage);
            }
        }


        const responseEdit = await this._userModel.edit();
        if (responseEdit.ok) {
            return responseEdit.ok;
        }

        throw new Error('Произошло что-то очень плохое');
    }

    /**
     * Get user info.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getProfile() {
        const response = await this._userModel.get();

        if (response.ok) {
            const extractedProfileDataMap = Extractor.extractProfileDataFromModel(this._userModel);
            extractedProfileDataMap.forEach((value, key) => {
                this.state[key] = value;
            });

            return this.state;
        }

        throw new Error(Errors.FailedToGetProfile);
    }
}
