const mongoose = require('mongoose');
// User name & class name, price, duration & date, time
const receiptSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    image: String
},{
    timestamps: true
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = {Receipt};    