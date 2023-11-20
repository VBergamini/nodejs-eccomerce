const express = require('express');
const AdminCategoriesController = require('../../controllers/admin/adminCategoriesController');
const multer = require('multer');
const Authentication = require('../../middlewares/authentication');

class adminCategoriesRoute {

    #router;

    get router() { return this.#router } set router(router) { this.#router = router }

    constructor() {

        var auth = new Authentication();

        this.#router = express.Router();
        var ctrl = new AdminCategoriesController();

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

        // get
        this.#router.get('/', ctrl.categoriesView);
        this.#router.get('/create', ctrl.createCategoryView);
        this.#router.get('/update/:id', ctrl.updateCategoryView);

        // post
        this.#router.post('/create', upload.single('inputImage'), ctrl.createCategory);

        // put
        this.#router.put('/update', upload.single('inputImage'), ctrl.updateCategory);

        // delete
        this.#router.delete('/delete', ctrl.deleteCategory);
    }
}

module.exports = adminCategoriesRoute;
