const express = require('express');
const AdminUsersController = require('../../controllers/admin/adminUsersController');

class AdminUsersRoute {

    #router;

    get router(){ return this.#router }

    constructor() {

        this.#router = express.Router();
        var ctrl = new AdminUsersController();

        // get
        this.#router.get('/', ctrl.usersView);
        this.#router.get('/create', ctrl.createUserView);
        this.#router.get('/update/:id', ctrl.updateUserView);

        // post
        this.#router.post('/create', ctrl.createUser);

        // put
        this.#router.put('/update', ctrl.updateUser);

        // delete
        this.#router.delete('/delete', ctrl.deleteUser);
        
    }
    
}

module.exports = AdminUsersRoute;