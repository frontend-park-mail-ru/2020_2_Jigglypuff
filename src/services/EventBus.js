/**
 * EventBus singleton
 * @class
 */
class EventBus {
    /**
     * Create one instance of EventBus
     * @constructor
     * */
    constructor() {
        this.listeners = {};
    }

    /**
     * Method that adds handler for the event
     * @param {string} event - name of the event
     * @param {function} callback - callback function for the event
     * */
    on(event, callback) {
        this.listeners[event] = this.listeners[event] ? this.listeners[event] : [];
        this.listeners[event].push(callback);
    }

    /**
     * Method that removes handler for the event
     * @param {string} event - name of the event
     * @param {function} callback - callback function for the event
     * */
    off(event, callback) {
        this.listeners[event] = this.listeners[event].filter(function(listener) {
            return listener !== callback;
        });
    }

    /**
     * Method that emits handler of the event
     * @param {string} event - name of the event
     * @param {Object} eventData - required data for the event
     * */
    emit(event, eventData = {}) {
        this.listeners[event].forEach(function(listener) {
            listener(eventData);
        });
    }
}

export default new EventBus();
