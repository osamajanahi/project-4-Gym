const {User} = require('../models/User');
const {Class} = require('../models/Class');

exports.class_registered_get = (req, res) =>{
    User.findById(req.query.user).populate('class')
    .then(thisUser =>{
        res.json(thisUser.class);
    })
    .catch(err =>{
        console.log(err);
    })
}
