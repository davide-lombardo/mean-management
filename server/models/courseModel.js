const mongoose = require('mongoose');
const { CourseCategory, CourseLevel, CourseStatus } = require('../enums/course');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the course']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the course'],
    maxlength: [244, 'Description must be at least 10 characters long']
  },
  category: {
    type: String,
    enum: Object.values(CourseCategory),
    required: [true, 'Please select a category for the course']
  },
  level: {
    type: String,
    enum: Object.values(CourseLevel),
    required: [true, 'Please specify the level of the course']
  },
  status: {
    type: String,
    enum: Object.values(CourseStatus),
    default: CourseStatus.Upcoming
  },
  // teacher: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: [true, 'Please assign a teacher to the course']
  // },
  maxStudents: {
    type: Number,
    default: 0,
    min: [0, 'Maximum number of students cannot be negative']
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Middleware per aggiornare il campo updatedAt
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware per validare il numero massimo di studenti
courseSchema.pre('save', function(next) {
  if (this.enrolledStudents.length > this.maxStudents) {
    return next(new Error('The number of enrolled students exceeds the maximum allowed'));
  }
  next();
});

// Metodo per aggiungere uno studente al corso
courseSchema.methods.enrollStudent = function(studentId) {
  if (this.enrolledStudents.includes(studentId)) {
    throw new Error('Student is already enrolled');
  }
  if (this.enrolledStudents.length >= this.maxStudents) {
    throw new Error('The course is full');
  }
  this.enrolledStudents.push(studentId);
};

// Metodo per rimuovere uno studente dal corso
courseSchema.methods.unenrollStudent = function(studentId) {
  const index = this.enrolledStudents.indexOf(studentId);
  if (index > -1) {
    this.enrolledStudents.splice(index, 1);
  } else {
    throw new Error('Student is not enrolled in this course');
  }
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
