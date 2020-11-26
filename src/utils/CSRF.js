import Routes from 'consts/Routes';

/** Class that contains methods to work with CSRF */
export default class CSRF {
    /**
     * Get CSRF token.
     * @return {Promise<Response>} true if got token without problems
     */
    static async getCSRF() {
        const response = await fetch(`${Routes.HostAPI}${Routes.CSRF}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const token = (await response.json())['Token'];
            localStorage.setItem('X-CSRF-Token', token);
        }

        return response;
    }
}
