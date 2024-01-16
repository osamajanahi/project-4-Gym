const {Class} = require('../models/Class');
const {Category} = require('../models/Category');
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');

exports.class_add_post = async (req, res) =>{
    let newClass = new Class(req.body);
    let images;
    // console.log(req)
    if (req.files) {
        images = req.files.map(file => `public/images/${file.filename}`);
    } else {
        images = [];
    }
    let pathDb = [];
    await uploadCloudinary.upload_multiple(images)
        .then((imagesPath)=>{
        //     console.log("this is the log from Cloud")
        imagesPath.forEach(pathImg =>{
            console.log(pathImg.url)
            pathDb.push(pathImg.url);
        })
        console.log(pathDb)
        newClass.image = pathDb;
        newClass.save()
        .then(newCLass =>{
            images.forEach(remove =>{
                // To remove the image from public/images and store it in cloudinary only
                fs.unlink(remove, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File is deleted.');
                    }
                    });    
            })
            Category.findById(req.body.category)
            .then((category) => {
                category.class.push(newClass);
                category.save();
            })
            .catch((err) => {
                console.log(err);
            });
            res.json(newClass);
        })
        .catch(err =>{
            console.log(err);
        })
    })
    }

exports.class_index_get = (req, res) =>{
    Class.find()
    .then(allClasses =>{
        res.json(allClasses);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.class_edit_get = (req, res) =>{
    Class.findById(req.query.id)
    .then(oneClass =>{
        res.json(oneClass);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.class_edit_post = (req, res) =>{
    Class.findByIdAndUpdate(req.body.id, req.body, { new: true })
    .then(updateClass =>{
        res.json(updateClass);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.class_delete_post = (req, res) =>{
    Class.findByIdAndDelete(req.query.id)
    .then(deletedClass =>{
        res.json(deletedClass);
    })
    .catch(err =>{
        console.log(err);
    })
}