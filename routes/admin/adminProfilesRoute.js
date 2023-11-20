const express = require('express');
const AdminProfilesController = require('../../controllers/admin/adminProfilesController');

class AdminProfilesRoute {

    #router;

    get router() {return this.#router};

    constructor() {

        this.#router = express.Router();
        var ctrl = new AdminProfilesController();

        // get
        this.#router.get('/', ctrl.profilesView);
        this.#router.get('/create', ctrl.profilesCreateView);

        // post
        this.#router.post('/create', ctrl.profilesCreate);

        // delete
        this.#router.delete('/delete', ctrl.profilesDelete);
        
    }

}

module.exports = AdminProfilesRoute;
