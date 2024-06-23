const Payment = require('./../models/paymentModel');
const Student = require('./../models/studentModel');
const Course = require('./../models/courseModel');
const Subscription = require('./../models/subscriptionModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllPayments = catchAsync(async (req, res, next) => {
    const payments = await Payment.find()
        .populate({
            path: 'student',
            select: 'name surname'
        })
        .populate('subscription', 'subscriptionDuration startDate endDate amount')
        .populate('course', 'title');
    
    res.status(200).json({
        status: 'success',
        results: payments.length,
        data: {
            payments: payments
        }
    });
});

exports.getPayment = catchAsync(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id)
    if (!payment) {
        return next(new AppError('No payment found with that ID', 404));
    };
    res.status(200).json(payment);
});

exports.addPayment = async (req, res, next) => {
    const { student, subscription, course, paymentDate } = req.body;

    try {
        // Validate subscription existence
        const foundSubscription = await Subscription.findById(subscription);
        if (!foundSubscription) {
            return next(new AppError('No subscription found for this payment', 404));
        }

        // Find the course using courseId
        const foundCourse = await Course.findById(course);
        if (!foundCourse) {
            return next(new AppError('No course found with the provided ID', 404));
        }

        const newPayment = await Payment.create({
            student: student,
            paymentDate: paymentDate,
            subscription: subscription,
            course: course,
            status: 'Pending'
        });    

        res.status(201).json({
            status: 'success',
            data: {
                payment: newPayment
            }
        });
    } catch (err) {
        return next(new AppError(err.message, 500));
    }
};

exports.deletePayment = catchAsync(async (req, res, next) => {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
        return next(new AppError('No payment found with that ID', 404));
    };
    res.status(204).json({ message: 'Success delete' });
});
