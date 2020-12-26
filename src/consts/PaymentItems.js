import Events from 'consts/Events';

const PaymentItems = {
    paymentInfo: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident`,
    fields: [
        {
            inputID: 'senderAddress',
            inputName: 'Публичный ключ',
            inputPlaceholder: 'Введите публичный ключ в формате 0x...',
            inputType: 'text',
            event: Events.PaymentFieldFill,
        },
        {
            inputID: 'signedTransaction',
            inputName: 'Транзакция',
            inputPlaceholder: 'Введите подписанную транзакцию в JSON-формате',
            inputType: 'text',
            event: Events.PaymentFieldFill,
        },
    ],
};

export default PaymentItems;
