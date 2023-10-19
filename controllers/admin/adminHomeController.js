
class adminHomeController {

    constructor() {

    }

    // get
    homeView(req, res) {

        res.render('admin/home/adminHome', {layout: 'admin/layout/adminLayout'});
        
    }
}


module.exports = adminHomeController;