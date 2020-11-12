import Routes from '../consts/Routes';

/** */
export default class CSRF {
    /**
     * Get CSRF token.
     * @return {Promise<boolean>} true if got token without problems
     */
    static async getCSRF() {
        const response = await fetch(Routes.HostAPI + Routes.CSRF, {
            method: 'GET',
            credentials: 'include',
        });

        console.log("GET CSRF");
        console.log("GET CSRF");
        console.log("GET CSRF");
        console.log("GET CSRF");
        console.log("GET CSRF");
        console.log("GET CSRF");
        console.log("GET CSRF");
        if (response.ok) {
            const token = (await response.json())['Token'];
            console.log("TOKEN", token);
            localStorage.set('X-CSRF-Token', token);
        }
        return response.ok;
    }
}
