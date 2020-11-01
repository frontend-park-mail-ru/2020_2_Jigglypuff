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
    }

    /**
     * Register route path
     * @param {Path} path - route path.
     * @param {view} view - view that handles path.
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
            const clickTarget = e.target;

            if (clickTarget.matches('a')) {
                e.preventDefault();

                const data = Object.assign({}, clickTarget.dataset);
                data.id = clickTarget.id;

                EventBus.emit(data.event, data);
            } else if (clickTarget.matches('button')) {
                e.preventDefault();

                const data = Object.assign({}, clickTarget.dataset);

                EventBus.emit(data.event, data);
            }
        });
        this.application.addEventListener('change', (e) => {
            const changeTarget = e.target;

            if (changeTarget.className === 'default-input') {
                e.preventDefault();

                EventBus.emit(changeTarget.dataset.event, e);
            }
        });
        window.addEventListener('popstate', () => {
            this.go(window.location.pathname);
        });

        this.go(window.location.pathname);
    }

    /**
     * Go to route path
     * @param {Path} path - route path.
     * */
    go(path) {
        const routeData = this.getDataFromPath(path);

        if (this.currentView === routeData.view) {
            return;
        }
        if (this.currentView) {
            this.currentView.show();
        }
        this.currentView = routeData.view;

        if (!this.currentView) {
            path = Routes.Main;
            this.currentView = this.getDataFromPath(path).view;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, null, path);
        }
        this.currentView.show();
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
     * @param {Path} path - route path.
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
        this.go(data.path);
    }
}

export default Router;
