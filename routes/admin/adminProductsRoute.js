const express = require('express');
const multer = require('multer');
const AdminProductsController = require('../../controllers/admin/adminProductsController');
const Authentication = require('../../middlewares/authentication');

class AdminProductsRoute {

    #router;

    get router() { return this.#router } set router(router) { this.#router = router }

    constructor() {

        var auth = new Authentication();

        this.#router = express.Router();
        var ctrl = new AdminProductsController;
        
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

        // get
        this.#router.get('/', ctrl.productsView);
        this.#router.get('/create', ctrl.createProductView);
        this.#router.get("/update/:id", ctrl.updateProductView);
        
        // post
        this.#router.post("/create", upload.single('inputImage'), ctrl.createProduct);

        // put
        this.#router.put("/update", upload.single('inputImage'), ctrl.updateProduct);

        // delete
        this.#router.delete("/delete", ctrl.deleteProduct);

    }
    
}

module.exports = AdminProductsRoute;