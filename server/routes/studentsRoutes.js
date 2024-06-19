const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');

const router = express.Router();


router.route('/')
    .get(authController.protect, studentController.getAllStudents)
    .post(authController.protect, studentController.createStudent)

router.route('/:id')
    .get(authController.protect, studentController.getStudent)
    .patch(authController.protect, studentController.updateStudent)
    .delete(authController.protect, studentController.deleteStudent);

module.exports = router;