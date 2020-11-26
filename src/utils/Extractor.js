import CinemaModel from '../models/CinemaModel';
import ExtractedFields from '../consts/ExtractedFields';
import MovieModel from '../models/MovieModel';

/** Class that contains methods to extract data from anything */
export default class Extractor {
    /**
     * Extract cinema data from json to cinema model.
     * @param {JSON} data
     * @return {CinemaModel}
     */
    static extractCinemaDataFromJSON(data) {
        const cinemaModel = new CinemaModel();

        for (const field in data) {
            if (!ExtractedFields.CinemaData.has(field)) {
                continue;
            }
            cinemaModel[field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            })] = data[field];
        }

        return cinemaModel;
    }

    /**
     * Extract cinema data from model to map.
     * @param {CinemaModel} data
     * @return {Map}
     */
    static extractCinemaDataFromModel(data) {
        const result = new Map();

        for (const field of ExtractedFields.CinemaData) {
            result.set(field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            }),
            data[field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            })]);
        }

        return result;
    }

    /**
     * Extract filled fields from Settings form.
     * @param {Object} data
     * @return {Map}
     */
    static extractSettingsFormData(data) {
        const result = new Map();

        for (const field of ExtractedFields.SettingsFormData) {
            result.set(field, data[field]);
        }

        return result;
    }

    /**
     * Extract profile data from model to map.
     * @param {UserModel} data
     * @return {Map}
     */
    static extractProfileDataFromModel(data) {
        const result = new Map();

        for (const field of ExtractedFields.ProfileData) {
            result.set(field, data[field]);
        }

        return result;
    }

    /**
     * Extract hall data from model to map.
     * @param {HallModel} data
     * @return {Map}
     */
    static extractHallDataFromModel(data) {
        const result = new Map();

        for (const field of ExtractedFields.HallData) {
            result.set(field, data[field]);
        }

        return result;
    }

    /**
     * Extract ticket from json to map.
     * @param {JSON} data
     * @return {Map}
     */
    static extractTicketScheduleFromJSON(data) {
        const result = new Map();

        for (const field of ExtractedFields.TicketScheduleData) {
            result.set(field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            }), data[field]);
        }

        return result;
    }

    /**
     * Extract schedule from json to map.
     * @param {JSON} data
     * @return {Map}
     */
    static extractScheduleDataFromJSON(data) {
        const result = new Map();

        for (const field in data) {
            if (!ExtractedFields.ScheduleData.has(field)) {
                continue;
            }
            result.set(field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            }), data[field]);
        }

        return result;
    }

    /**
     * Extract schedule data from model to map.
     * @param {ScheduleModel} data
     * @return {Map}
     */
    static extractScheduleDataFromModel(data) {
        const result = new Map();

        for (const field of ExtractedFields.ScheduleData) {
            result.set(field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            }),
            data[field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            })]);
        }

        return result;
    }

    /**
     * Extract movie data from json to model.
     * @param {JSON} data
     * @return {MovieModel}
     */
    static extractMovieDataFromJSON(data) {
        const movieModel = new MovieModel();

        data['ActorList'] = this.extractActorList(data);
        data['GenreList'] = this.extractGenreList(data);

        for (const field in data) {
            if (!ExtractedFields.MovieData.has(field)) {
                continue;
            }
            movieModel[field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            })] = data[field];
        }

        return movieModel;
    }

    /**
     * Extract movie data from model to map.
     * @param {MovieModel} data
     * @return {Map}
     */
    static extractMovieDataFromModel(data) {
        const result = new Map();

        data.actorList = this.extractActorList(data);
        data.genreList = this.extractGenreList(data);

        for (const field of ExtractedFields.MovieData) {
            result.set(field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            }),
            data[field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            })]);
        }

        return result;
    }

    /**
     * Extract genre list.
     * @param {JSON|MovieModel} data
     * @return {Array}
     */
    static extractGenreList(data) {
        const genreList = [];

        if (data.constructor === JSON.constructor) {
            for (const genre of data['GenreList']) {
                genreList.push(genre);
            }
        } else {
            for (const genre of data.genreList) {
                genreList.push(genre);
            }
        }

        return genreList;
    }

    /**
     * Extract actor list.
     * @param {JSON|MovieModel} data
     * @return {Array}
     */
    static extractActorList(data) {
        const actorList = [];

        if (data.constructor === JSON.constructor) {
            for (const actor of data['ActorList']) {
                actorList.push(`${actor['Name']} ${actor['Patronymic']} ${actor['Surname']}`);
            }
        } else {
            for (const actor of data.actorList) {
                actorList.push(`${actor['Name']} ${actor['Patronymic']} ${actor['Surname']}`);
            }
        }

        return actorList;
    }

    /**
     * Extract movie data from model to map.
     * @param {TicketModel} data
     * @return {Map}
     */
    static extractTicketDataFromModel(data) {
        const result = new Map();

        for (const field of ExtractedFields.TicketData) {
            if (data[field].constructor === ({}).constructor) {
                const resultObject = {};

                for (const fieldObject of Object.entries(data[field].replace(/^[A-Z]+/, (c) => {
                    return c.toLowerCase();
                }))) {
                    resultObject[fieldObject[0].replace(/^[A-Z]+/, (c) => {
                        return c.toLowerCase();
                    })] = fieldObject[1];
                }

                result.set(field.replace(/^[A-Z]+/, (c) => {
                    return c.toLowerCase();
                }), resultObject);
            } else {
                result.set(field.replace(/^[A-Z]+/, (c) => {
                    return c.toLowerCase();
                }),
                data[field.replace(/^[A-Z]+/, (c) => {
                    return c.toLowerCase();
                })]);
            }
        }

        return result;
    }

    /**
     * Extract ticket data from json to map.
     * @param {JSON} data
     * @return {Map}
     */
    static extractTicketDataFromJSON(data) {
        const result = new Map();

        for (const field in data) {
            if (!ExtractedFields.TicketData.has(field)) {
                continue;
            }

            if (data[field].constructor === ({}).constructor) {
                const resultObject = {};

                for (const fieldObject of Object.entries(data[field])) {
                    resultObject[fieldObject[0].replace(/^[A-Z]+/, (c) => {
                        return c.toLowerCase();
                    })] = fieldObject[1];
                }

                result.set(field.replace(/^[A-Z]+/, (c) => {
                    return c.toLowerCase();
                }), resultObject);
            } else {
                result.set(field.replace(/^[A-Z]+/, (c) => {
                    return c.toLowerCase();
                }), data[field]);
            }
        }

        return result;
    }
}
