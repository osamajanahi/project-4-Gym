// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();

const receiptCtrl = require('../controllers/receipt')

router.use(express.json());

router.post('/add', receiptCtrl.receipt_create_post);
router.get('/myreceiptments', receiptCtrl.receipt_index_get);
router.get('/deleteUser', receiptCtrl.admin_remove_user);
router.get('/classUsers', receiptCtrl.admin_usersInClass_get);
router.get('/notClassUsers', receiptCtrl.admin_usersNotInClass_get)




module.exports = router;