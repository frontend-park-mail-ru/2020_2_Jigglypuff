import CinemaModel from 'models/CinemaModel';
import ExtractedFields from 'consts/ExtractedFields';
import HallModel from 'models/HallModel';
import MovieModel from 'models/MovieModel';
import ScheduleModel from 'models/ScheduleModel';
import TicketModel from 'models/TicketModel';
import UserModel from 'models/UserModel';

/** Class that contains methods to extract data from anything */
export default class Extractor {
    /**
     * Extract cinema data from json to cinema model.
     * @param {JSON} data
     * @param {CinemaModel} cinemaModel
     * @return {CinemaModel}
     */
    static extractCinemaDataFromJSON(data, cinemaModel = new CinemaModel()) {
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
     * @param {JSON} data
     * @param {UserModel} userModel
     * @return {UserModel}
     */
    static extractUserDataFromJSON(data, userModel = new UserModel()) {
        data['PathToAvatar'] = data['AvatarPath'];
        for (const field in data) {
            if (!ExtractedFields.ProfileData.has(field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            }))) {
                continue;
            }
            userModel[field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            })] = data[field];
        }
        userModel.login = data['UserCredentials']['Login'];

        return userModel;
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
     * Extract hall data from JSON to model.
     * @param {JSON} data
     * @param {HallModel} hallModel
     * @return {HallModel}
     */
    static extractHallDataFromJSON(data, hallModel = new HallModel()) {
        for (const field in data) {
            if (!ExtractedFields.HallData.has(field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            }))) {
                continue;
            }
            hallModel[field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            })] = data[field];
        }

        return hallModel;
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
     * Extract replies from json to map.
     * @param {JSON} data
     * @return {Map}
     */
    static extractRepliesFromJSON(data) {
        const result = new Map();

        for (const field in data) {
            if (!ExtractedFields.ReplyData.has(field)) {
                continue;
            }
            try {
                data[field].constructor;
            } catch (err) {
                data[field] = 0;
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

    /**
     * Extract schedule from JSON to model.
     * @param {JSON} data
     * @param {ScheduleModel} scheduleModel
     * @return {ScheduleModel}
     */
    static extractScheduleModelFromJSON(data, scheduleModel = new ScheduleModel()) {
        for (const field in data) {
            if (!ExtractedFields.ScheduleData.has(field)) {
                continue;
            }
            scheduleModel[field.replace(/^[A-Z]+/, (c) => {
                return c.toLowerCase();
            })] = data[field];
        }

        return scheduleModel;
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
     * @param {MovieModel} movieModel
     * @return {MovieModel}
     */
    static extractMovieDataFromJSON(data, movieModel = new MovieModel()) {
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
                genreList.push(genre['Name']);
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
                if (`${actor['Patronymic']}`.length !== 0) {
                    actorList.push(`${actor['Name']} ${actor['Patronymic']} ${actor['Surname']}`);
                } else {
                    actorList.push(`${actor['Name']} ${actor['Surname']}`);
                }
            }
        } else {
            for (const actor of data.actorList) {
                actorList.push(actor);
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

    /**
     * Extract schedule from JSON to model.
     * @param {JSON} data
     * @param {TicketModel} ticketModel
     * @return {TicketModel}
     */
    static extractTicketModelFromJSON(data, ticketModel = new TicketModel()) {
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

                ticketModel[field.replace(/^[A-Z]+/, (c) => {
                    return c.toLowerCase();
                })] = resultObject;
            } else {
                ticketModel[field.replace(/^[A-Z]+/, (c) => {
                    return c.toLowerCase();
                })] = data[field];
            }
        }

        return ticketModel;
    }
}
