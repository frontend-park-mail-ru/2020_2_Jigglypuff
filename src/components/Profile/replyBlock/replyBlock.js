import StandardButton from 'components/BaseComponents/buttons/standartButton/standardButton';
import Events from 'consts/Events';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';
import Component from 'components/component';
import template from './replyBlock.hbs';

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

        console.log(this._context);

        this._context.SubmitReply = (new StandardButton({
            buttonName: 'Отправить',
            event: Events.SubmitReply,
        })).render();
        this._context.Validation = (new ValidationBlock({
            message: 'Вы уже прокомментировали данный фильм',
        })).render();
    }
}
