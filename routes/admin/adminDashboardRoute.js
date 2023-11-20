const express = require('express');
const AdminDashboardController = require('../../controllers/admin/adminDashboardController');

class AdminDashboardRoute {

    #router;

    get router() { return this.#router }
    set router(router) { this.#router = router }

    constructor() {

        this.#router = express.Router();
        var ctrl = new AdminDashboardController();

        // get
        this.#router.get('/', ctrl.dashboardView);
        
    }
    
}

module.exports = AdminDashboardRoute;
