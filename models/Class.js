const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String]
    }
},{
    timestamps: true
});

const Class = mongoose.model("Class", classSchema);

module.exports = {Class};    