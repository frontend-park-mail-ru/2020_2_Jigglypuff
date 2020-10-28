/** Class that contains methods to extract data from anything */
export default class Extractor {
    /**
     * Extract filled fields from Settings form.
     * @param {Map} data
     * @return {Map}
     */
    static extractFormData(data) {
        const result = new Map();

        if (data['state'].login !== '') {
            result['login'] = data['state'].login;
        }

        if (data['state'].password !== '') {
            result['password'] = data['state'].password;
        }

        if (data['state'].email !== '') {
            result['email'] = data['state'].email;
        }

        if (data['state'].name !== '') {
            result['name'] = data['state'].name;
        }

        if (data['state'].surname !== '') {
            result['surname'] = data['state'].surname;
        }


        if (data['state'].avatar !== '') {
            result['avatar'] = data['state'].avatar;
        }

        return result;
    }
}
