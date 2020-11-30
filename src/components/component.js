/**
 * Base class of components
 * @class
 */
export default class Component {
    /**
     * Create a component
     * @constructor
     * @param {Object} context - component context
     * */
    constructor(context) {
        this._context = context;
    }

    /**
     * Render a component
     * @return {string}
     * */
    render() {
        return this._template(this._context);
    }
}
