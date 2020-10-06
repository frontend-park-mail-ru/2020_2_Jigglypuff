export class EditProfileComponent {
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
        this._el.appendChild(window.fest['static/components/EditProfile/EditProfile.tmpl'](this._data))
    }
}