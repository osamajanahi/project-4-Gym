const {Category} = require('../models/Category');

exports.category_create_post = (req, res) =>{
    let cate = new Category(req.body)
    cate.save()
    .then(newCate =>{
        console.log("Added successfully");
        res.json(newCate);
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.category_index_get = (req, res) =>{
    Category.find()
    .then(category =>{
        res.json(category);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.category_edit_get = (req, res) =>{
    Category.findById(req.query.id)
    .then(oneCat =>{
        res.json(oneCat);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.category_edit_post = (req, res) =>{
    Category.findByIdAndUpdate(req.body.id, req.body, { new: true })
    .then(updatedCat =>{
        res.json(updatedCat);
    })
    .catch(err =>{
        console.log(err);
    })
}