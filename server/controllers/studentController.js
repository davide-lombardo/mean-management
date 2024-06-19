const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Subscription = require('../models/subscriptionModel');
const { SubscriptionStatus } = require('../enums/subscription');


exports.getAllStudents = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Student.find(), req.query).paginate();
    const students = await features.query;
    const countStudents = await Student.countDocuments();
    res.status(200).json({
        status: 'success',
        students,
        countStudents
    });
});

exports.getStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return next(new AppError('No student found with that ID', 404));
    };
    res.status(200).json(student);
});

exports.createStudent = catchAsync(async (req, res, next) => {
    const courseId = req.body.course;
    const subscriptionId = req.body.subscription;

    if (!courseId || !subscriptionId) {
        return next(new AppError('Course ID and Subscription ID are required', 400));
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
        return next(new AppError('No subscription found with that ID', 404));
    }

    const subscriptionExpires = new Date();
    subscriptionExpires.setDate(subscriptionExpires.getDate() + (30 * req.body.subscriptionDuration))
    const statusSubscription = SubscriptionStatus.Active;
    const newStudent = {
        ...req.body,
        course: {
            _id: course._id,
            title: course.title,
            level: course.level,
            category: course.category
        },
        subscription: subscriptionId,
        subscriptionExpires,
        statusSubscription
    }
    const studentSuccess = await Student.create(newStudent);
    res.status(201).json(studentSuccess);
});

exports.updateStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!student) {
        return next(new AppError('No student found with that ID', 404));
    };
    res.status(200).json(student);
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
        return next(new AppError('No student found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        message: 'Student deleted successfully'
    });
});
