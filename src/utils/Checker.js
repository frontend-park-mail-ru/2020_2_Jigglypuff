/** Class that contains different check methods */
export default class Checker {
    /**
     * Check if number is float.
     * @param {any} n
     * @return {boolean} true - if number is float
     */
    static isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
}
