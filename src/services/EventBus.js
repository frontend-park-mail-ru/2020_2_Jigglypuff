/**
 * Events handler
 * @class
 */
class EventBus {
    /**
     * Create one instance of handler
     * @constructor
     * */
    constructor() {
        this.listeners = {};
    }
    /**
     * Set handler function on event
     * @param {Event} event - name of the event.
     * @param {callback} callback - callback function on event.
     * */
    on(event, callback) {
        this.listeners[event] = this.listeners[event] ? this.listeners[event] : [];
        this.listeners[event].push(callback);
    }

    /**
     * Remove handler function from event
     * @param {Event} event - name of the event.
     * @param {callback} callback - callback function on event.
     * */
    off(event, callback) {
        this.listeners[event] = this.listeners[event].filter(function(listener) {
            return listener !== callback;
        });
    }

    /**
     * Emit event
     * @param {Event} event - name of the event.
     * @param {Object} eventData - data for callback function.
     * */
    emit(event, eventData = {}) {
        this.listeners[event].forEach(function(listener) {
            listener(eventData);
        });
    }
}

export default new EventBus();
