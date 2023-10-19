const express = require('express');
const AdminUsersController = require('../../controllers/admin/adminUsersController');
const Authentication = require('../../middlewares/authentication');

class AdminUsersRoute {

    #router;

    get router(){ return this.#router }

    constructor() {

        this.#router = express.Router();
        var authentication = new Authentication();
        var ctrl = new AdminUsersController();

        // get
        this.#router.get('/', authentication.verifyLogedUser, ctrl.usersView);
        this.#router.get('/create', authentication.verifyLogedUser, ctrl.createUserView);
        this.#router.get('/update/:id', authentication.verifyLogedUser, ctrl.updateUserView);

        // post
        this.#router.post('/create', authentication.verifyLogedUser, ctrl.createUser);

        // put
        this.#router.put('/update', authentication.verifyLogedUser, ctrl.updateUser);

        // delete
        this.#router.delete('/delete', authentication.verifyLogedUser, ctrl.deleteUser);
        
    }
    
}

module.exports = AdminUsersRoute;