const express = require('express');
const StoreBrandsController = require('../../controllers/store/storeBrandsController');

class StoreBrandsRoute {

    #router;

    get router() {return this.#router }
    set router(rotuer) { this.#router = rotuer }

    constructor() {

        this.#router = express.Router();
        var ctrl = new StoreBrandsController();

        //get
        this.#router.get('/', ctrl.brandsView);
        this.#router.get('/:id', ctrl.brandsFilterView);

    }
    
 }

 module.exports = StoreBrandsRoute;