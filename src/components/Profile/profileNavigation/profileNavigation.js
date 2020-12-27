import Component from 'components/component';
import template from 'components/Profile/profileNavigation/profileNavigation.hbs';
import ProfileNavigationItems from 'consts/ProfileNavigationItems';
import Events from 'consts/Events';

/**
 * Profile content component
 * @class
 */
export default class ProfileNavigation extends Component {
    /**
     * Create a profile content component
     * @constructor
     * @param {Object} context - profile content context
     * */
    constructor(context = {}) {
        super(context);
        this._template = template;

        this._blockID = this._context.blockID;
        this._context = JSON.parse(JSON.stringify(ProfileNavigationItems.fields));

        for (const i of this._context) {
            i.event = Events.ChangeProfileBlock;
        }
    }

    /**
     * @return {string}
     * */
    render() {
        const block = document.createElement('div');
        block.innerHTML = this._template(this._context);

        for (const i of block.getElementsByClassName('profile-navigation__item')) {
            if (i.dataset.id === this._blockID) {
                i.classList.add('profile-navigation__item_enabled');
                break;
            }
        }
        return block.innerHTML;
    }
}
