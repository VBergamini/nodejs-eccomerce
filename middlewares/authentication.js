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

                    res.send({ok: false, msg: 'This user is inactive!'})
                    //res.redirect('/login');
                }
        }
        else{

            res.send({ok: false, msg: 'You need to login first!'})
            //res.redirect("/login");
        }
    }

    async adminPermission(req, res, next) {
        
        if(req.headers.cookie != undefined && 
            req.headers.cookie.includes('logedUser')) {
                let id = req.cookies.logedUser;
                let user = new UsersModel();
                user = await user.getUser(id);
                if(user.userActive == 'Y' && user.profileId == 1){
                    res.locals.logedUser = user;
                    next();
                }
                else{

                    res.send({ok: false, msg: 'No permission'});
                    //res.redirect('/login');
                }
        }
        else{

            res.send({ok: false, msg: 'You need to login first!'});
            //res.redirect("/login");
        }
    }
}

module.exports = Authentication;
