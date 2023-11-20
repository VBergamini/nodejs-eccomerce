const express = require('express');
const AdminUsersController = require('../../controllers/admin/adminUsersController');
const Authentication = require('../../middlewares/authentication');

class AdminUsersRoute {

    #router;

    get router(){ return this.#router }

    constructor() {

        var auth = new Authentication();
        this.#router = express.Router();
        var ctrl = new AdminUsersController();

        // get
        this.#router.get('/', ctrl.usersView);
        this.#router.get('/create', auth.adminPermission, ctrl.createUserView);
        this.#router.get('/update/:id', auth.adminPermission, ctrl.updateUserView);

        // post
        this.#router.post('/create', auth.adminPermission, ctrl.createUser);

        // put
        this.#router.put('/update', auth.adminPermission, ctrl.updateUser);

        // delete
        this.#router.delete('/delete', auth.adminPermission, ctrl.deleteUser);
        
    }
    
}

module.exports = AdminUsersRoute;
