export class SignInComponent {
    constructor({parentElement = document.body} = {}) {
        this._el = parentElement;
    }

    set data(d) {
        this._data = d;
    }

    get data() {
        return this._data
    }

    render() {
        this._el.innerHTML = window.fest['static/components/SignIn/SignIn.tmpl'](this._data);
    }
}