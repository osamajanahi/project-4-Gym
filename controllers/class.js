const {Class} = require('../models/Class');
const {Category} = require('../models/Category');
const {User} = require('../models/User')
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');

exports.class_add_post = async (req, res) =>{
    console.log(req.body)
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

exports.class_edit_post = async (req, res) =>{
    // console.log(req)
    // console.log(req.files)
    if(req.files && req.files.length != 0){
        let images;
        let pathDb = [];
        images = req.files.map(file => `public/images/${file.filename}`);
        await uploadCloudinary.upload_multiple(images)
        .then((imagesPath) =>{
            imagesPath.forEach(pathImg =>{
                console.log(pathImg.url)
                pathDb.push(pathImg.url);
            })
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
            const body = req.body;
            // console.log(pathDb);
            body.image = pathDb;
            console.log(body)
            Class.findByIdAndUpdate(req.body._id, body, {new: true})
            .then((newClass) => {
                console.log("new")
                console.log(newClass)
                res.json(newClass);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('Internal Server Error');
            });
        })
        .catch((err) =>{
            console.log(err);
        })    
    
    }
    else{
        console.log('not image')
        Class.findByIdAndUpdate(req.body._id, req.body, {new: true})
        .then((newCLass) => {
            console.log(newCLass)
            res.json(newCLass);
        })
        .catch((err)=>{
            console.log(err)
        })
        } 


    // Class.findByIdAndUpdate(req.body._id, req.body, { new: true })
    // .then(updateClass =>{
    //     res.json(updateClass);
    // })
    // .catch(err =>{
    //     console.log(err);
    // })
}

exports.class_delete_post = (req, res) =>{
    console.log(req.body._id)
    Class.findByIdAndDelete(req.body._id)
    .then(deletedClass =>{
        res.json(deletedClass);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.enroll_user_post = (req, res) =>{
    console.log(req.query)
    Class.findById({_id: req.query.class})
    .then(thisClass =>{
        thisClass.user.push(req.query.user);
        thisClass.save()
        .then(updated =>{
            User.findById({_id: req.query.user})
            .then(newUser =>{
                newUser.class.push(req.query.class);
                newUser.save();
                res.json(updated)
            })
            .catch(err =>{
                console.log(err);
            })
        })
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.class_users_get = (req, res) =>{
    Class.findById(req.query.class).populate('user')
    .then(users =>{
        res.json(users.user);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.class_notUsers_get = (req, res) =>{
    User.find({ class: { $ne: req.query.class } })
    .then(users =>{
        res.json(users)
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.remove_userClass_post = (req, res) =>{
    Class.findById(req.body.class)
    .then(thisClass =>{
        let userIndex = thisClass.user.indexOf(req.body.user);
        if(userIndex != -1){
            thisClass.user.splice(userIndex, 1);
            User.findById(req.body.user)
            .then(thisUser =>{
                let classIndex = thisUser.class.indexOf(req.body.class);
                if(classIndex != -1){
                    thisUser.class.splice(classIndex,1);
                    thisUser.save()
                }
            })
            .catch(err =>{
                console.log(err);
            })
        }
        thisClass.save()
        .then(updated =>{
            res.json(updated)
        })
        .catch(err =>{
            console.log(err);
        })
    })
    .catch(err =>{
        console.log(err);
    })
}