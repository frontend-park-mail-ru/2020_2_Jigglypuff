import Component from 'components/component';
import template from './replyBlock.hbs'

/**
 * @class
 */
import StandardButton from "components/baseComponents/buttons/standartButton/standardButton";
import Events from "consts/Events";

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
    }
}
