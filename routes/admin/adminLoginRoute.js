const express = require('express');
const AdminLoginController = require('../../controllers/admin/adminLoginController');

class AdminLoginRoute {

    #router;

    get router(){ return this.#router }

    constructor() {

        this.#router = express.Router();
        var ctrl = new AdminLoginController();

        // get
        this.#router.get('/', ctrl.loginView);
        this.#router.get("/logout", ctrl.logoutView);

        // post
        this.#router.post('/', ctrl.authenticateUser);
        
    }

}

module.exports = AdminLoginRoute;
