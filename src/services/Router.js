import EventBus from './EventBus';
import Events from '../consts/Events';
import Routes from '../consts/Routes';

/**
 * Router
 * @class
 */
class Router {
    /**
     * Create one instance of handler
     * @constructor
     * @param {HTMLElement} application
     * */
    constructor(application) {
        this.application = application;
        this.routes = [];

        EventBus.on(Events.ChangePath, this.onChangePath.bind(this));
        EventBus.on(Events.ScrollToBlock, this.onScrollToBlock.bind(this));
    }

    /**
     * Register route path
     * @param {String} path - route path.
     * @param {MainView} view - view that handles path.
     *
     * @return {Router}
     * */
    register(path, view) {
        this.routes.push({
            regPath: new RegExp('^' + path.replace(/(:\w+)/, '(\\d+)') + '/?$'),
            view: view,
        });

        return this;
    }

    /**
     * Start router
     * */
    start() {
        this.application.addEventListener('click', (e) => {
            let clickTarget = e.target;

            if (clickTarget.matches('a') || clickTarget.matches('button') || clickTarget.parentNode.matches('button') || clickTarget.parentNode.matches('a')) {
                e.preventDefault();

                if (clickTarget.parentNode.matches('button') || clickTarget.parentNode.matches('a')) {
                    clickTarget = clickTarget.parentNode;
                }

                const data = Object.assign({}, clickTarget.dataset);

                if (clickTarget.hasOwnProperty('id')) {
                    data.id = clickTarget.id;
                }
                data.target = clickTarget;

                EventBus.emit(data.event, data);
            }
        });
        this.application.addEventListener('change', (evt) => {
            const changeTarget = evt.target;

            if (changeTarget.matches('input')) {
                evt.preventDefault();

                const data = Object.assign({}, changeTarget.dataset);
                data.id = changeTarget.id;
                data.value = changeTarget.value;
                data.target = changeTarget;

                EventBus.emit(data.event, data);
            }
        });
        window.addEventListener('popstate', (e) => {
            this.go(window.location.pathname, window.history.state);
        });

        this.go(window.location.pathname);
    }

    /**
     * Go to route path
     * @param {String} path - route path.
     * @param data
     * */
    go(path, data = {}) {
        const routeData = Object.assign({}, this.getDataFromPath(path), data);

        console.log(routeData);

        if (this.currentView === routeData.view) {
            this.currentView.show(routeData);
            return;
        }

        this.currentView = routeData.view;

        if (window.location.pathname !== path) {
            window.history.pushState(null, null, path);
        }
        this.currentView.show(routeData);
    }

    /**
     * Back to the previous page
     * */
    back() {
        window.history.back();
    }

    /**
     * Forward to the next page
     * */
    forward() {
        window.history.forward();
    }

    /**
     * Get data from route path
     * @param {String} path - route path.
     *
     * @return {Object}
     * */
    getDataFromPath(path) {
        const result = {};

        this.routes.forEach(({regPath, view}) => {
            const match = path.match(regPath);

            if (match) {
                const id = match[match.length - 1];

                result.id = id ? +id : null;
                result.view = view;
            }
        });

        return result;
    }

    /**
     * Event handler on changing path
     * @param {Object} data - handler data.
     * */
    onChangePath(data) {
        this.go(data.path, data);
    }

    onScrollToBlock(data) {
        let target = document.getElementById(data.id);
        document.body.scrollTo(target);
        document.body.animate({scrollTop: data.offset}, 1500);
    }
}

export default Router;
