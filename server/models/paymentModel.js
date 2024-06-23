const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
