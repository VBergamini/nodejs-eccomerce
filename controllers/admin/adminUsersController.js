const ProfilesModel = require("../../models/profilesModel");
const UsersModel = require("../../models/usersModel");

class AdminUsersController {

    // get
    async usersView(req, res) {

        var user = new UsersModel();
        var listUsers = await user.recoveryUsers();

        res.render('admin/users/adminUsers', {layout: 'admin/layout/adminLayout', listUsers: listUsers});

    }

    // get
    async createUserView(req, res) {

        var profile = new ProfilesModel();
        var listProfile = await profile.recoveryProfile();

        res.render('admin/users/adminUsersCreate', {layout: 'admin/layout/adminLayout', listProfile: listProfile});

    }

    // get
    async updateUserView(req, res) {

        if(req.params.id != undefined) {

            let user = new UsersModel();
            user = await user.getUser(req.params.id)
            let profile = new ProfilesModel();
            let listProfile = await profile.recoveryProfile();

            res.render('admin/users/adminUsersUpdate', {layout: 'admin/layout/adminLayout', user: user, listProfile: listProfile});

        }
        else {

            res.redirect("/");

        }
        
    }

    // post
    async createUser(req, res) {

        if (req.body.name != ''  && req.body.email != '' && req.body.profile != '0' && req.body.password != '') {
            
            let user = new UsersModel(0, req.body.name, req.body.email, req.body.active, req.body.password, req.body.profile);
            
            let result = await user.createUser();

            if (result == true) {

                res.send({ok: true, msg: 'Usuer created'});

            }
            else {

                res.send({ok: false, msg: 'Error on create user'});

            }

        }
        else {

            res.send({ok: false, msg: 'Invalid data'});

        }
    }

    // put
    async updateUser(req, res) {

        if (req.body.id > 0 && req.body.name != ''  && req.body.email != '' && req.body.profile != '0' && req.body.password != '') {
            
            let user = new UsersModel(req.body.id, req.body.name, req.body.email, req.body.active, req.body.password, req.body.profile);
            
            let result = await user.createUser();

            if (result == true) {

                res.send({ok: true, msg: 'User Updated'});

            }
            else {

                res.send({ok: false, msg: 'Error on update user!'});

            }

        }
        else {

            res.send({ok: false, msg: 'Invalid Data!'});

        }

    }

    // delete
    async deleteUser(req, res) {

        if (req.body.id != '') {

            let user = new UsersModel();
            let result = await user.deleteUser(req.body.id);

            if (result == true) {

                res.send({ok: true, msg: 'User deleted!'});

            }
            else {

                res.send({ok: false, msg: 'Error on delete user!'});

            }

        }
        else {

            res.send({ok: false, msg: 'Invalid Data!'});

        }

    }
    
}

module.exports = AdminUsersController;
