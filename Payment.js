const mongoose = require('mongoose');
const paymentSchema = mongoose.Schema({
        amount : Number,
        dateModified: Date,
        isCheque: Boolean,
        studentId: mongoose.Schema.Types.ObjectId
    }
)
const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;