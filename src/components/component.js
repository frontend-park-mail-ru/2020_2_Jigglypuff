/**
 * Base class of components
 * @class
 */
export default class Component {
    /**
     * Create a component
     * @param {Object} context - component context
     * */
    constructor(context) {
        this.context = context;
    }

    /**
     * Render current template
     * @return {Object}
     * */
    render() {
        return this.template(this.context);
    }
}
