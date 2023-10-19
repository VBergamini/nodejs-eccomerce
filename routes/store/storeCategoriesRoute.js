const express = require('express');
const StoreCategoriesController = require('../../controllers/store/storeCategoriesController');

class StoreCategoriesRoute {

    #router;

    get router() {return this.#router }
    set router(rotuer) { this.#router = rotuer }

    constructor() {

        this.#router = express.Router();
        var ctrl = new StoreCategoriesController();

        //get
        this.#router.get('/', ctrl.categoriesView);
        this.#router.get('/:id', ctrl.categoriesFilterView);

    }
    
 }

 module.exports = StoreCategoriesRoute;