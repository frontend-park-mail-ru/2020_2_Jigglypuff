import UserModel from '../models/UserModel';

/** Class that contains BaseView ViewModel */
export default class BaseView {
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
            throw new Error('you are not authorised');
        }

        const userModel = new UserModel();
        const response = await userModel.logout();

        if (response.ok) {
            return null;
        }

        throw new Error('failed to logout');
    }
}
