const Database = require('../db/database');

const connect = new Database();

class ProfilesModel {

    #profileId;
    #profileDescription;

    get profileId() { return this.#profileId; } set profileId(profileId){ this.#profileId = profileId; }
    get profileDescription(){ return this.#profileDescription; } set profileDescription(profileDescription) { this.#profileDescription = profileDescription; }

    constructor(profileId, profileDescription) {

        this.#profileId = profileId;
        this.#profileDescription = profileDescription;

    }

    async recoveryProfile() {

        var sql = "SELECT * FROM tb_profiles";
        var rows = await connect.QueryCommand(sql);
        var listProfile = []

        if (rows.length > 0) {

            for (let i = 0; i< rows.length; i++) {

                listProfile.push(new ProfilesModel(rows[i]["pro_id"], rows[i]["pro_description"]));

            }

        }

        return listProfile;

    }

}

module.exports = ProfilesModel;