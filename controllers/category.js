const {Category} = require('../models/Category');
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');

exports.category_create_post = async (req, res) =>{
    console.log(req.body)
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
    Category.find().populate('class')
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

exports.category_edits_post = (req, res) =>{
    console.log(req.body);
}

exports.category_edit_post = async (req, res) =>{
    const id = req.body.id;
    const updatedData = req.body;
    console.log(req.body)
    if (req.file) {
        const image = `public/images/${req.file.filename}`;
        try {
            const imagePath = await uploadCloudinary.upload_single(image);
            updatedData.image = imagePath.url;
    
            fs.unlink(image, err => {
                if (err) console.error(err);
                else console.log('Local file deleted after Cloudinary upload.');
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Error uploading image. Please try again later.");
        }
    }
    
    
    Category.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedCat =>{
        res.json(updatedCat);
    })
    .catch(err =>{
        console.log(err);
    })
}




exports.category_detail_get = (req, res) => {
    Category.findById(req.query.id)
    .then((category) => {
        res.json({ category })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving category details.");
    });
};
