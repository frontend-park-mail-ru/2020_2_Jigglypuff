class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        this.listeners[event] = this.listeners[event] ? this.listeners[event] : [];
        this.listeners[event].push(callback);
    }

    off(event, callback) {
        console.log('this.listeners[event]');
        this.listeners[event] = this.listeners[event].filter(function(listener) {
            console.log(listener);
            console.log('----------');
            console.log(callback);
            return listener !== callback;
        });
        console.log(this.listeners[event]);
        console.log('this.listeners[event]');
    }

    emit(event, eventData = {}) {
        this.listeners[event].forEach(function(listener) {
            listener(eventData);
        });
    }
}

export default new EventBus();
