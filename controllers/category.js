const {Category} = require('../models/Category');
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');

exports.category_create_post = async (req, res) =>{
    let category = new Category(req.body)
    if (req.file) {
        let image = `public/images/${req.file.filename}`;
        try {
            let imagePath = await uploadCloudinary.upload_single(image);
            category.image = imagePath.url;

            fs.unlink(image, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Local file deleted after Cloudinary upload.');
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Error uploading image. Please try again later.");
        }
    }

    try {
        let savedCategory = await category.save();
        res.json({ category: savedCategory });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving category. Please try again later.");
    }
};


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