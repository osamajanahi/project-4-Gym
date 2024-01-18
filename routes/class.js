// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();

const classCtrl = require('../controllers/class');

const upload = require('../config/multerConfig');

router.use(express.json());

router.post('/add', upload.array('image',5), classCtrl.class_add_post);
router.get('/', classCtrl.class_index_get);
router.get('/edit', classCtrl.class_edit_get);
router.post('/edit', classCtrl.class_edit_post);
router.get('/delete', classCtrl.class_delete_post);
router.get('/enroll', classCtrl.enroll_user_post);
router.get('/users', classCtrl.class_users_get);
router.get('/notUsers', classCtrl.class_notUsers_get);
router.post('/removeUser', classCtrl.remove_userClass_post)


module.exports = router;