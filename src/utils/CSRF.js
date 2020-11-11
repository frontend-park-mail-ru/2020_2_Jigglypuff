import Routes from '../consts/Routes';

/** */
export default class CSRF {
    /**
     * Get CSRF token.
     * @return {Promise<boolean>} true if got token without problems
     */
    static async getCSRF() {
        const response = await fetch(Routes.Host + Routes.CSRF, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const token = localStorage.getItem('token');
            localStorage.set('X-CSRF-Token', token);
        }
        return response.ok;
    }
}
