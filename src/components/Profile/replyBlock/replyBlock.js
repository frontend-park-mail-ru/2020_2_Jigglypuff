import StandardButton from 'components/BaseComponents/buttons/standartButton/standardButton';
import Events from 'consts/Events';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';
import Component from 'components/component';
import template from './replyBlock.hbs';
import Avatar from 'components/BaseComponents/avatar/avatar';
import Routes from 'consts/Routes';
import EventBus from 'services/EventBus';

/**
 * @class
 */
export default class ReplyBlock extends Component {
    /**
     * @constructor
     * @param {Object} context - register content context
     * */
    constructor(context = {}) {
        super(context);
        this._template = template;
        this._onEditReplyHandler = this._onEditReply.bind(this);

        EventBus.on(Events.EditReply, this._onEditReplyHandler);

        let profileID = 0;
        if (this._context.profile) {
            this._context.profile.Avatar = (new Avatar(this._context.profile)).render();
            profileID = this._context.profile.id;
        }
        if (this._context.replies) {
            for (const item of this._context.replies) {
                if (item.user.userID === profileID) {
                    this._profileText = item.text;
                    this._profileReplyID = item.id;
                    item.user.EditButton = (new StandardButton({
                        buttonName: 'Редактировать',
                        event: Events.EditReply,
                    })).render();

                    this._context.isEdition = true;
                }
                item.user.pathToAvatar = `${Routes.Host}${item.user.avatarPath}`;
                item.user.Avatar = (new Avatar(item.user)).render();
            }
        }

        this._context.SubmitReply = (new StandardButton({
            buttonName: 'Отправить',
            event: Events.SubmitReply,
        })).render();
        this._context.Validation = (new ValidationBlock({
            message: 'Вы уже прокомментировали данный фильм',
        })).render();
    }
    /**
     *
     */
    _onEditReply() {
        const input = document.querySelector('.reply__input');
        input.innerHTML = this._profileText;

        document.querySelector('.reply__edit').style.display = 'block';
        document.querySelector('.reply__submit').firstElementChild.setAttribute('data-reply', this._profileReplyID);
    }
}
