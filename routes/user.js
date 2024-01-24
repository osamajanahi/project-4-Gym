// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();

const userCtrl = require('../controllers/user');


router.use(express.json());

router.get('/classesRegistered', userCtrl.class_registered_get);
router.get('/userType', userCtrl.user_type_get);



module.exports = router;