var mongoose = require('mongoose');
var studentSchema = mongoose.Schema({
    name: String,
    class: String,
    school: String,
    subjects: [],
    contactNumber: Number,
    academicYear: String,
    amount: Number
});
var Student = mongoose.model('student', studentSchema);

module.exports = Student;