const catchAsync = require('../utils/catchAsync');
const Course = require('../models/courseModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllCourses = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Course.find(), req.query).paginate();
    const courses = await features.query;
    const countCourses = await Course.countDocuments();
    res.status(200).json({
        status: 'success',
        courses,
        countCourses
    });
});

exports.getCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    };
    res.status(200).json(course);
});

exports.createCourse = catchAsync(async (req, res, next) => {
    const newCourse = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        level: req.body.level,
        status: req.body.status || 'Upcoming',
        maxStudents: req.body.maxStudents || 0,
        enrolledStudents: req.body.enrolledStudents || [],
    };

    const courseSuccess = await Course.create(newCourse);

    res.status(201).json(courseSuccess);
});

exports.updateCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    };
    res.status(200).json(course);
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        message: 'Course deleted successfully'
    });
});

