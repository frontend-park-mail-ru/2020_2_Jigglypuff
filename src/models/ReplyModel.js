import Routes from 'consts/Routes';
import Statuses from 'consts/Statuses';
import CSRF from 'utils/CSRF';

/** Class that contains Reply model */
export default class ReplyModel {
    /**
     * Declare ReplyModel attributes.
     */
    constructor() {
        this._movieID = null;
        this._text = null;
        this._userName = null;
        this._userRating = null;
        this._userSurname = null;
    }

    /**
     * Get movieID.
     * @return {int}
     */
    get movieID() {
        return this._movieID;
    }

    /**
     * Get text.
     * @return {string}
     */
    get text() {
        return this._text;
    }

    /**
     * Get userName.
     * @return {string}
     */
    get userName() {
        return this._userName;
    }

    /**
     * Get userRating.
     * @return {int|null}
     */
    get userRating() {
        return this._userRating;
    }

    /**
     * Get userSurname.
     * @return {string}
     */
    get userSurname() {
        return this._userSurname;
    }

    /**
     * Set reply movie ID to "movieID" variable value
     * @param {int} movieID
     */
    set movieID(movieID) {
        this._movieID = Number(movieID);
    }

    /**
     * Set reply text to "text" variable value
     * @param {string} text
     */
    set text(text) {
        this._text = text;
    }

    /**
     * Set reply userName to "userName" variable value
     * @param {string} userName
     */
    set userName(userName) {
        this._userName = userName;
    }

    /**
     * Set reply user rating to "userRating" variable value
     * @param {int|null} userRating
     */
    set userRating(userRating) {
        this._userRating = Number(userRating);
    }

    /**
     * Set reply userSurname to "userSurname" variable value
     * @param {string} userSurname
     */
    set userSurname(userSurname) {
        this._userSurname = userSurname;
    }

    /**
     * Get movie replies.
     * @param {int} movieID
     * @param {int} limit
     * @param {int} page
     * @return {Promise<Response>}
     */
    async getReplies(movieID = 0, limit = 10, page = 0) {
        return await fetch(`${Routes.HostAPI}${Routes.Reply}?movie_id=${movieID}&limit=${limit}&page=${page}`, {
            method: 'GET',
            credentials: 'include',
        });
    }

    /**
     * Create reply.
     * @return {Promise<Response>}
     */
    async createReply() {
        console.log(JSON.stringify({'movieID': this._movieID, 'text': this._text}));
        const response = await fetch(`${Routes.HostAPI}${Routes.Reply}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': localStorage['X-CSRF-Token'],
            },
            body: JSON.stringify({'movieID': this._movieID, 'text': this._text}),
        });

        if (!response.ok) {
            if (response.status === Statuses.Forbidden) {
                await CSRF.getCSRF();
                await this.createReply();
            }
        }

        return response;
    }
}
