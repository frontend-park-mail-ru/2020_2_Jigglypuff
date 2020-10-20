export class MovieDescriptionComponent {
    constructor({parentElement = document.body} = {}) {
        this._el = parentElement;
    }

    set data(d) {
        this._data = d;
    }

    get data() {
        return this._data;
    }

    render() {
        this._el.innerHTML = window.fest['static/components/MovieDescription/MovieDescription.tmpl'](this._data);
    }
}
