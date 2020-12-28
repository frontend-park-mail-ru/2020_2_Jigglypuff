import Component from 'components/component';
import template from 'components/paymentContent/paymentContent.hbs';
import TextInput from 'components/BaseComponents/textInput/textInput';
import StandardButton from 'components/BaseComponents/buttons/standartButton/standardButton';
import PaymentItems from 'consts/PaymentItems';
import Events from 'consts/Events';
import ValidationBlock from 'components/BaseComponents/validationBlock/validationBlock';

/**
 * Login content component
 * @class
 */
export default class PaymentContent extends Component {
    /**
     * Create a header
     * @constructor
     * @param {Object} context - login content context
     * */
    constructor(context = {}) {
        super(context);
        this._template = template;
        this._context.input = [];

        for (const item of PaymentItems.fields) {
            this._context.input.push((new TextInput(item)).render());
        }
        this._context.paymentInfo = PaymentItems.paymentInfo;

        this._context.Validation = (new ValidationBlock({
            message: 'Пожалуйста, загрузите верный формат аватара',
        })).render();

        this._context.OnlinePay = (new StandardButton({
            buttonName: 'Банковская карта',
            event: Events.PaymentOnline,
        })).render();
        this._context.Ethereum = (new StandardButton({
            buttonName: 'Ethereum',
            event: Events.PaymentCrypto,
        })).render();
        this._context.SubmitPayment = (new StandardButton({
            buttonName: 'Оплатить',
            event: Events.PaymentSubmit,
        })).render();
    }
}
