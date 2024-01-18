const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    class: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    type: {
        type: String,
        // required: true
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = {User};    