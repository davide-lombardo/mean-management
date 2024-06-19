// enums/payment.js
const PaymentMethod = {
    CreditCard: 'CreditCard',
    PayPal: 'PayPal',
    BankTransfer: 'BankTransfer',
    Cash: 'Cash'
};

const PaymentStatus = {
    Pending: 'Pending',
    Completed: 'Completed',
    Failed: 'Failed',
    Refunded: 'Refunded'
};

module.exports = {
    PaymentMethod,
    PaymentStatus
};