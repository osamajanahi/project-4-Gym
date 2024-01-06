const mongoose = require('mongoose');

const facilitiesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String
},{
    timestamps: true
});

const Facilities = mongoose.model("Facilities", facilitiesSchema);

module.exports = {Facilities};    