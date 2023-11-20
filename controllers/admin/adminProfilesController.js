const ProfilesModel = require("../../models/profilesModel");

class AdminProfilesController {

    // get
    async profilesView(req, res) {

        var listProfile = [];
        var profile = new ProfilesModel();
        listProfile = await profile.recoveryProfile();

        res.render('admin/profiles/adminProfiles', {layout: 'admin/layout/adminLayout', listProfile: listProfile});

    }

    // get
    async profilesCreateView(req, res) {

        res.render('admin/profiles/adminProfilesCreate', {layout:'admin/layout/adminLayout'});

    }

    // post
    async profilesCreate(req, res) {

        var ok = false;
        var msg = 'Error on create a profile';

        if(req.body.proDescription != null && req.body.proDescription != '') {

            var profile = new ProfilesModel();
            profile = await profile.createProfile(req.body.proDescription);
            ok = true;
            msg = 'New profile created successfully'

        }

        res.send({ok: ok, msg: msg});

    }

    // delete
    async profilesDelete(req, res) {

        var ok = false;
        var msg = 'Error on delete profile';

        if(req.body.profile != null && req.body.profile != '') {

            let profile = new ProfilesModel();

            if(await profile.profileIsEmpty(req.body.profile) == true) {

                let result = await profile.deleteProfile(req.body.profile)

                if(result == true) {

                    ok = true;
                    msg = 'Profile deleted successfully'

                }
            }
            else {

                ok = false;
                msg = 'Please remove all user from this profile first';

            }

        }

        res.send({ok: ok, msg: msg});

    }

}

module.exports = AdminProfilesController;
