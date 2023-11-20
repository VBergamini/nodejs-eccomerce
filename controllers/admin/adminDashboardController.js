class adminDashboardController {

    constructor() {

    }

    // get
    dashboardView(req, res) {

        res.render('admin/dashboard/adminDashboard', {layout: 'admin/layout/adminLayout'});
        
    }
}

module.exports = adminDashboardController;
