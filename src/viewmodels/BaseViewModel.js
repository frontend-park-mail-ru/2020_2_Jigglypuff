import Errors from 'consts/Errors';
import UserModel from 'models/UserModel';

/** Class that contains BaseViewModel ViewModel */
export default class BaseViewModel {
    /**
     * Check if user is authorised.
     * @return {Promise<boolean>}
     */
    static async isAuthorised() {
        const userModel = new UserModel();
        const response = await userModel.get();

        return response.ok;
    }

    /**
     * Logout user.
     * @return {Promise<Error>}
     */
    static async logout() {
        if (!await this.isAuthorised()) {
            throw new Error(Errors.NotAuthorised);
        }

        const userModel = new UserModel();
        const response = await userModel.logout();

        if (response.ok) {
            return null;
        }

        throw new Error(Errors.FailedToLogout);
    }
}
