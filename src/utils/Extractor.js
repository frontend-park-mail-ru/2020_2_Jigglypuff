/** Class that contains methods to extract data from anything */
export default class Extractor {
    /**
     * Extract filled fields from Settings form.
     * @param {Map} data
     * @return {Map}
     */
    static extractFormData(data) {
        const result = new Map();

        if (!data['state'].login.length) {
            result['login'] = data['state'].login;
        }

        if (!data['state'].password.length) {
            result['password'] = data['state'].password;
        }

        if (!data['state'].email.length) {
            result['email'] = data['state'].email;
        }

        if (!data['state'].name.length) {
            result['name'] = data['state'].name;
        }

        if (!data['state'].surname.length) {
            result['surname'] = data['state'].surname;
        }


        if (!data['state'].avatar.length) {
            result['avatar'] = data['state'].avatar;
        }

        return result;
    }

    /**
     * Extract filled fields from movieData form.
     * @param {MovieModel} data
     * @return {Map}
     */
    static extractMovieData(data) {
        const result = new Map();

        if (!data.ageGroup.length) {
            result['ageGroup'] = data.ageGroup;
        }

        if (!data.country.length) {
            result['country'] = data.country;
        }

        if (!data.pathToAvatar.length) {
            result['pathToAvatar'] = data.pathToAvatar;
        }

        if (!data.description.length) {
            result['description'] = data.description;
        }

        if (!data.director.length) {
            result['director'] = data.director;
        }

        if (!data.duration.length) {
            result['duration'] = data.duration;
        }

        if (!data.genre.length) {
            result['genre'] = data.genre;
        }

        if (!data.name.length) {
            result['name'] = data.name;
        }

        if (!data.ratingGlobal.length) {
            result['ratingGlobal'] = data.ratingGlobal;
        }

        if (!data.ratingUser.length) {
            result['ratingUser'] = data.ratingUser;
        }

        if (!data.reviews.length) {
            result['reviews'] = data.reviews;
        }

        if (!data.starring.length) {
            result['starring'] = data.starring;
        }

        if (!data.releaseYear.length) {
            result['year'] = data.releaseYear;
        }

        return result;
    }
}
