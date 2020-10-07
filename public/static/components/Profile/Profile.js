export class ProfileComponent {
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
		this._el.innerHTML = window.fest['static/components/Profile/Profile.tmpl'](this._data);
	}
}