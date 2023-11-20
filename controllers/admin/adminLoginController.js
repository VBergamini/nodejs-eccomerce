const UsersModel = require("../../models/usersModel");

class AdminLoginController {

    // get
    loginView(req, res) {

        res.render('admin/login/adminLogin', {layout: 'admin/login/adminLogin'});

    }

    // get
    logoutView(req, res) {

        res.clearCookie('logedUser');
        res.redirect('/');

    }

    // post
    async authenticateUser(req, res) {

        if(req.body.email != undefined && req.body.password != undefined) {

            let user = new UsersModel();
            user = await user.authenticateUser(req.body.email, req.body.password);

            if (user != null) {

                res.cookie('logedUser', user.userId);
                res.send({status: true, msg: 'Success Authenticated'});

            }
            else {

                res.send({status: false, msg: 'Invalid Credentials'});

            }
        }
        else {

            res.send({status: false, msg: 'Invalid Credentials'});

        }
        
    }

}

module.exports = AdminLoginController;
