const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Read), productsController.getAllProducts)
    .post(verifyRoles(ROLES_LIST.Edit), productsController.createNewProduct)
    .put(verifyRoles(ROLES_LIST.Edit), productsController.updateProduct)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Edit), productsController.deleteProduct);

router.route('/:id')
    .get(productsController.getProduct)

module.exports = router;