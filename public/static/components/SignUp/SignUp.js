export class SignUpComponent {
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
        this._el.innerHTML = window.fest['static/components/SignUp/SignUp.tmpl'](this._data)
    }

}