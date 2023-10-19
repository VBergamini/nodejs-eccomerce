const express = require('express');
const Authentication = require('../../middlewares/authentication');
const AdminHomeController = require('../../controllers/admin/adminHomeController');

class AdminHomeRoute {

    #router;

    get router() { return this.#router }
    set router(router) { this.#router = router }

    constructor() {

        this.#router = express.Router();
        var authentication = new Authentication();
        var ctrl = new AdminHomeController();

        // get
        this.#router.get('/', authentication.verifyLogedUser, ctrl.homeView);
        
    }
    
}

module.exports = AdminHomeRoute;