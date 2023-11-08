const express = require('express');
const StoreController = require('../../controllers/store/storeController');

class StoreRoute {

    #router;

    get router() {return this.#router }
    set router(rotuer) { this.#router = rotuer }

    constructor() {

        this.#router = express.Router();
        var ctrl = new StoreController();

        //get
        this.#router.get('/', ctrl.homeView);
        this.#router.get('/store/categories', ctrl.categoriesView);
        this.#router.get('/store/categories/:id', ctrl.categoriesFilterView);
        this.#router.get('/store/brands', ctrl.brandsView);
        this.#router.get('/brands/:id', ctrl.brandsFilterView);
        this.#router.get('/store/products/:id', ctrl.singleProductView);
        this.#router.get('/store/search', ctrl.searchView);
        this.#router.get('/store/cart/add/:id', ctrl.addToCart);

    }
    
 }

 module.exports = StoreRoute;