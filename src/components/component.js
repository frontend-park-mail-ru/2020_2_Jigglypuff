/**
 * @class
 * Base class of components
 */
export default class Component {
    /**
     * Create a component
     * @param context - component context
     * */
    constructor(context) {
        this.context = context;
    }

    render() {
        return this.template(this.context);
    }
}
