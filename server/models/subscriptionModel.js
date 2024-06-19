const mongoose = require('mongoose');
const { SubscriptionStatus } = require('../enums/subscription');

const subscriptionSchema = new mongoose.Schema({
    subscriptionDuration: {
        type: Number,
        required: [true, "La subscription deve contenere la durata in mesi"],
        min: [1, "La durata dell'abbonamento deve essere di almeno 1 mese"]
    },
    amount: {
        type: Number,
        required: [true, "Bisogna inserire il prezzo dell'abbonamento"],
        min: [0, "Il prezzo deve essere maggiore o uguale a 0"]
    },
    startDate: {
        type: Date,
        required: [true, "Bisogna inserire la data di inizio dell'abbonamento"],
        default: Date.now
    },
    endDate: {
        type: Date,
        required: [true, "Bisogna inserire la data di fine dell'abbonamento"],
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "La data di fine deve essere successiva alla data di inizio"
        }
    },
    status: {
        type: String,
        enum: Object.values(SubscriptionStatus),
        default: SubscriptionStatus.Active
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, "L'abbonamento deve essere associato ad un utente"]
    // },
    // course: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Course',
    //     required: [true, "L'abbonamento deve essere associato ad un corso"]
    // }
});

subscriptionSchema.methods.isActive = function () {
    return this.status === SubscriptionStatus.Active && new Date() < this.endDate;
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;