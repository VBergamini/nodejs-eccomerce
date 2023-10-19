const express = require('express');
const multer = require('multer');
const AdminProductsController = require('../../controllers/admin/adminProductsController');
const Authentication = require('../../middlewares/authentication');

class AdminProductsRoute {

    #router;

    get router() { return this.#router } set router(router) { this.#router = router }

    constructor() {

        this.#router = express.Router();
        var authentication = new Authentication();
        
        var storage = multer.diskStorage(
            {
                destination: function(req, res, cb) {
                    cb(null, 'public/img/admin/products');
                },
                filename: function(req, file, cb) {
                    var ext = file.originalname.split('.')[1];
                    cb(null, Date.now().toString() + '.' + ext);
                }
            }
        );

        var upload = multer({storage});

        var ctrl = new AdminProductsController;

        // get
        this.#router.get('/', authentication.verifyLogedUser, ctrl.productsView);
        this.#router.get('/create', authentication.verifyLogedUser, ctrl.createProductView);
        this.#router.get("/update/:id", authentication.verifyLogedUser, ctrl.updateProductView);
        
        // post
        this.#router.post("/create", authentication.verifyLogedUser, upload.single('inputImage'), ctrl.createProduct);

        // put
        this.#router.put("/update", authentication.verifyLogedUser, upload.single('inputImage'), ctrl.updateProduct);

        // delete
        this.#router.delete("/delete", authentication.verifyLogedUser, ctrl.deleteProduct);

    }
    
}

module.exports = AdminProductsRoute;