const express = require('express');
const multer = require('multer');
const AdminBrandsController = require('../../controllers/admin/adminBrandsController');
const Authentication = require('../../middlewares/authentication');

class adminBrandsRoute {

    #router;

    get router() { return this.#router } set router(router) { this.#router = router }

    constructor() {

        var auth = new Authentication();

        this.#router = express.Router();
        var ctrl = new AdminBrandsController();

        var storage = multer.diskStorage(
            {
                destination: function(req, res, cb) {
                    cb(null, 'public/img/admin/brands');
                },
                filename: function(req, file, cb) {
                    var ext = file.originalname.split('.')[1];
                    cb(null, Date.now().toString() + '.' + ext);
                }
            }
        )

        var upload = multer({storage});
        
        // get
        this.#router.get('/', ctrl.brandsView);
        this.#router.get('/create', ctrl.createBrandView);
        this.#router.get('/update/:id', ctrl.updateBrandView);

        // post
        this.#router.post('/create', upload.single('inputImage'), ctrl.createBrand);

        // put
        this.#router.put('/update', upload.single('inputImage'), ctrl.updateBrand);

        // delete
        this.#router.delete('/delete', ctrl.deleteBrand);

    }

}

module.exports = adminBrandsRoute;