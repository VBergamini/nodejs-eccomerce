const express = require('express');
const AdminCategoriesController = require('../../controllers/admin/adminCategoriesController');
const Autenthication = require('../../middlewares/authentication');
const multer = require('multer');

class adminCategoriesRoute {

    #router;

    get router() { return this.#router } set router(router) { this.#router = router }

    constructor() {

        this.#router = express.Router();
        let authentication = new Autenthication();

        var storage = multer.diskStorage(
            {
                destination: function(req, res, cb) {
                    cb(null, 'public/img/admin/categories');
                },
                filename: function(req, file, cb) {
                    var ext = file.originalname.split('.')[1];
                    cb(null, Date.now().toString() + '.' + ext);
                }
            }
        )
        var upload = multer({storage});

        var ctrl = new AdminCategoriesController();

        // get
        this.#router.get('/', authentication.verifyLogedUser, ctrl.categoriesView);
        this.#router.get('/create', authentication.verifyLogedUser, ctrl.createCategoryView);
        this.#router.get('/update/:id', authentication.verifyLogedUser, ctrl.updateCategoryView);

        // post
        this.#router.post('/create', authentication.verifyLogedUser, upload.single('inputImage'), ctrl.createCategory);

        // put
        this.#router.put('/update', authentication.verifyLogedUser, upload.single('inputImage'), ctrl.updateCategory);

        // delete
        this.#router.delete('/delete', authentication.verifyLogedUser, ctrl.deleteCategory);
    }
}

module.exports = adminCategoriesRoute;