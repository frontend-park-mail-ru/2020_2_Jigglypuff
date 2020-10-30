/** Class that contains different check methods */
export default class Checker {
    /**
     * Check if number is float.
     * @param {any} number
     * @return {boolean} true - if number is float
     */
    static isFloat(number) {
        return Number(number) === number && number % 1 !== 0;
    }

    /**
     * Check if number is unsigned int.
     * @param {any} number
     * @return {boolean} true - if number is unsigned int
     */
    static isUINT(number) {
        const regExp = /^\d+$/;
        return regExp.test(number);
    }

    /**
     * Check if given argument is image
     * @param {any} image
     * @return {boolean} true - if given argument is image
     */
    static isImage(image) {
        return image instanceof HTMLImageElement;
    }
}
