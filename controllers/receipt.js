const {Receipt} = require('../models/Receipt');

exports.receipt_create_post = (req, res) =>{
    console.log(req.body)
    let receipt = new Receipt(req.body)
    receipt.save()
    .then(values =>{
        res.json(values);
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.receipt_index_get = (req, res) =>{
    Receipt.find({user:req.query.user}).populate('class')
    .then(myReceiptments =>{
        res.json(myReceiptments);
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.admin_remove_user = (req, res) =>{
    Receipt.deleteOne({user:req.query.user, class: req.query.class})
    .then(otherUsers =>{
        res.json(otherUsers)
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.admin_usersInClass_get = (req, res) =>{
    Receipt.find({class: req.query.class}).populate('user')
    .then(usersClass =>{
        res.json(usersClass)
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.admin_usersNotInClass_get = (req, res) =>{
    Receipt.find({ class: { $ne: req.query.class } })
    .then(usersClass =>{
        res.json(usersClass)
    })
    .catch(err =>{
        console.log(err);
    })
}