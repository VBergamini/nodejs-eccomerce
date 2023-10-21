const express = require('express');
const StoreHomeController = require('../../controllers/store/storeHomeController');

class StoreHomeRoute {

    #router;

    get router() {return this.#router }
    set router(rotuer) { this.#router = rotuer }

    constructor() {

        this.#router = express.Router();
        var ctrl = new StoreHomeController();

        //get
        this.#router.get('/', ctrl.storeFrontView);
        this.#router.get('/search', ctrl.searchView);

    }
    
 }

 module.exports = StoreHomeRoute;