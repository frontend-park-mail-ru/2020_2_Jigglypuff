import BaseView from './BaseView';
import Extractor from '../utils/Extractor';
import UserModel from '../models/UserModel';

/** Class that contains SignIn ViewModel */
export default class SettingsViewModel extends BaseView {
    /**
     * Represents Settings ViewModel constructor
     */
    constructor() {
        super();

        this._userModel = new UserModel();
        this.state = new Map([
            ['login', ''],
            ['name', ''],
            ['surname', ''],
            ['avatar', ''],
            ['avatarPath', ''],
        ]);
        this.editCommand = {exec: () => this.edit()};
    }

    /**
     * Change user info.
     * @return {Promise<Response>}
     */
    async edit() {
        const response = await this.getProfile();

        const statusCode = Number(response.json().statusCode);
        if (statusCode !== Number(response.status.HTTP_STATUS_OK)) {
            throw new Error('failed to get profile');
        }

        const extractedDataMap = Extractor.extractFormData(this.state);
        for (const field of extractedDataMap) {
            this._userModel[field.keys()] = field.values();
        }

        return await this._userModel.edit();
    }

    /**
     * Get user info.
     * @return {Promise<Response>}
     */
    async getProfile() {
        const response = this._userModel.get();

        const statusCode = Number(await response.json().statusCode);

        if (statusCode === response.status.HTTP_STATUS_OK) {
            this.state.login = this._userModel.login;
            this.state.name = this._userModel.name;
            this.state.surname = this._userModel.surname;
            this.state.avatarPath = this._userModel.avatarPath;
        }

        return await response.json();
    }
}
