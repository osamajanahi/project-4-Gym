// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();

const upload = require('../config/multerConfig');

router.use(express.json());

const categoryCtrl = require('../controllers/category');

router.post('/add', upload.single('image') ,categoryCtrl.category_create_post);
router.get('/', categoryCtrl.category_index_get);
router.get('/edit', categoryCtrl.category_edit_get);
router.post('/edit', categoryCtrl.category_edit_post);


module.exports = router;