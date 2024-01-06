const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    image: String
},{
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

module.exports = {Category};    