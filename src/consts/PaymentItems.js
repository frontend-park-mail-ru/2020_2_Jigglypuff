import Events from 'consts/Events';

const PaymentItems = {
    paymentInfo: `Введите ключ и подписанную транзакцию в формате JSON. Тело транзакции должно быть сформировано по 
    следующим параметрам:
    1) Получатель: 0x2D00D90471195AFAa49bf53cA55D0406DC4d635d
    2) chainID: 4 (Rinkeby).
     
    АКЦИЯ! До 31.12.2020 покупка билета эфиром возможна за любую цену.`,
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
