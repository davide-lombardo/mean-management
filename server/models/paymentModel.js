const mongoose = require('mongoose');
const { PaymentMethod, PaymentStatus } = require('../enums/payment');

const paymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, "Il pagamento deve contenere l'id dello studente"]
    },
    paymentDate: {
        type: Date,
        required: [true, "Bisogna inserire la data del pagamento"],
        default: Date.now
    },
    // method: {
    //     type: String,
    //     enum: Object.values(PaymentMethod),
    //     required: [true, "Bisogna specificare il metodo di pagamento"]
    // },
    status: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.Pending
    },
    subscription: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subscription',
        required: [true, "Il pagamento deve essere associato ad una sottoscrizione"]
    },
    course: {
        title: {
            type: String,
            required: true
        },
    },
});

paymentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'student',
        select: 'name surname'
    }).populate({
        path: 'subscription',
        select: 'subscriptionDuration startDate endDate amount'
    });
    next();
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;