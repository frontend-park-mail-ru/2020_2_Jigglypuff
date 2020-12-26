import template from 'view/PaymentView/PaymentView.hbs';
import View from 'view/BaseView/View';
import EventBus from 'services/EventBus';
import Events from 'consts/Events';
import Routes from 'consts/Routes';
import BaseViewModel from 'viewmodels/BaseViewModel';
import PaymentContent from 'components/paymentContent/paymentContent';

/**
 * Class of the login view
 */
export default class PaymentView extends View {
    /**
     * Constructor of the login view
     * @constructor
     * @param {string} title - title of the login page
     */
    constructor(title = 'CinemaScope') {
        super(title);
        this._template = template;
    }

    /**
     * Method that shows login view
     * @param {Object} routeData
     */
    async show(routeData) {
        if (!(await BaseViewModel.isAuthorised())) {
            await EventBus.emit(Events.ChangePath, {path: Routes.Login});
            return;
        }
        console.log(routeData);
        this._ticketViewModel = routeData.ticketViewModel;

        this._onOnlinePaymentHandler = this._onOnlinePayment.bind(this);
        this._onCryptoPaymentHandler = this._onCryptoPayment.bind(this);
        this._onPaymentFieldFillHandler = this._onUpdateField.bind(this);
        this._onPaymentSubmitHandler = this.onSubmit.bind(this);

        EventBus.on(Events.PaymentFieldFill, this._onPaymentFieldFillHandler);
        EventBus.on(Events.PaymentSubmit, this._onPaymentSubmitHandler);
        EventBus.on(Events.PaymentCrypto, this._onCryptoPaymentHandler);
        EventBus.on(Events.PaymentOnline, this._onOnlinePaymentHandler);

        const data = {
            PaymentContent: (new PaymentContent()).render(),
        };

        console.log(data);

        await super.show(this._template(data));
    }

    /**
     * Method that hides login view
     */
    hide() {
        EventBus.off(Events.PaymentFieldFill, this._onPaymentFieldFillHandler);
        EventBus.off(Events.PaymentSubmit, this._onPaymentSubmitHandler);
        EventBus.off(Events.PaymentCrypto, this._onCryptoPaymentHandler);
        EventBus.off(Events.PaymentOnline, this._onOnlinePaymentHandler);

        super.hide();
    }
    /**
     * Method that shows login view
     */
    async _onOnlinePayment() {
        const responseTicketViewModel = this._ticketViewModel.buyTicketCommand.exec();

        await responseTicketViewModel
            .then(() => {
                document.querySelector('.payment__crypto').style.display = 'none';
                document.querySelector('.payment__options').style.display = 'none';
                document.querySelector('.payment__success').style.display = 'block';
                setTimeout(() => {
                    EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
                }, 2000);
            }).catch((err) => {
                const validation = document.querySelector('.validation-block');
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });
    }
    /**
     * Method that shows login view
     */
    async _onCryptoPayment() {
        document.querySelector('.payment__crypto').style.display = 'block';
    }

    /**
     * Method that handles input from login fields
     * @param {Object} data - contains entered data from input field
     */
    _onUpdateField(data = {}) {
        if (data.event === Events.PaymentFieldFill) {
            this._ticketViewModel.stateTransaction[data.id] = data.value;
        }
    }

    /**
     * Method that handles submitting of login form
     */
    async onSubmit() {
        const responseCryptoPayment = this._ticketViewModel.buyTicketByCryptoCommand.exec();

        await responseCryptoPayment
            .then(async () => {
                document.querySelector('.payment__crypto').style.display = 'none';
                document.querySelector('.payment__options').style.display = 'none';
                document.querySelector('.payment__success').style.display = 'block';
                setTimeout(() => {
                    EventBus.emit(Events.ChangePath, {path: Routes.ProfilePage});
                }, 1000);
            })
            .catch((err) => {
                const validation = document.querySelector('.validation-block');
                validation.innerHTML = err.message;
                validation.classList.remove('validation-display-none');
            });
    }
}
