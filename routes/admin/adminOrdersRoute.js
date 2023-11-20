const express = require('express');
const OrderController = require('../../controllers/admin/adminOrdersController');

class AdminOrderRoute {

    #router;

    get router() {
        
        return this.#router;

    }

    constructor() {

        this.#router = express.Router();
        var ctrl = new OrderController();
        
        this.#router.get('/', ctrl.List);

    }

}

module.exports = AdminOrderRoute;
