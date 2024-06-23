const mongoose = require('mongoose');
const { SubscriptionStatus } = require('../enums/subscription');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name needs to be provided"],
        maxlength: [20, 'A name must have less or equal then 30 characters'],
        minlength: [3, 'A name must have more or equal then 10 characters']
    },
    surname: {
        type: String,
        required: [true, "Surname needs to be provided"],
        maxlength: [20, 'A surname must have less or equal then 30 characters'],
        minlength: [3, 'A surname must have more or equal then 10 characters']
    },
    birth: {
        type: Date,
        required: [true, "Birth date needs to be provided"],
    },
    gender: {
        type: String,
        required: [true, "Gender needs to be provided"],
    },
    subscriptionDuration: {
        type: Number,
        required: [true, "Subscription duration needs to be provided"],
    },
    weeklyLessons: {
        type: Number,
        require: [true, "Weekly lessons needs to be provided"]
    },
    subscriptionExpires: {
        type: Date,
        required: [true, "Subscription expiration date needs to be provided"],
    },
    statusSubscription: {
        type: String,
        required: [true, 'A customer must have a status subscription'],
        default: 'Active',
        enum: {
            values: Object.values(SubscriptionStatus),
            message: `Status is either: ...`
        }
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Student must be associated with a course']
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: [true, 'Student must be associated with a subscription']
    }
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
