const UsersModel = require("../models/usersModel");

class Authentication {

    async verifyLogedUser(req, res, next) {
        if(req.headers.cookie != undefined && 
            req.headers.cookie.includes('logedUser')) {
                let id = req.cookies.logedUser;
                let user = new UsersModel();
                user = await user.getUser(id);
                if(user.userActive == 'Y'){
                    res.locals.logedUser = user;
                    next();
                }
                else {
                    res.redirect('/login');
                }
        }
        else{
            res.redirect("/login");
        }
    }
}

module.exports = Authentication;