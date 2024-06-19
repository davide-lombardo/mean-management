const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();


router.route('/')
    .get(authController.protect, courseController.getAllCourses)
    .post(authController.protect, courseController.createCourse)

// router.route('/:id')
//     .get(authController.protect, customerController.getCustomer)
//     .patch(authController.protect, customerController.updateCustomer)

module.exports = router;