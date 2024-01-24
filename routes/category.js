// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();

const upload = require('../config/multerConfig');

router.use(express.json());

const categoryCtrl = require('../controllers/category');

router.post('/add', upload.single('image'), categoryCtrl.category_create_post);
router.get('/', categoryCtrl.category_index_get);
router.get('/edit', categoryCtrl.category_edit_get);
router.post('/edit', upload.single('image'), categoryCtrl.category_edit_post);
router.post('/edits', categoryCtrl.category_edits_post);
router.get('/detail', categoryCtrl.category_detail_get);


module.exports = router;