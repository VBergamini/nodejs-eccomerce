const Database = require('../db/database');

const connect = new Database();

class ProfilesModel {

    #profileId; #profileDescription;

    get profileId() { return this.#profileId; } set profileId(profileId){ this.#profileId = profileId; }
    get profileDescription(){ return this.#profileDescription; } set profileDescription(profileDescription) { this.#profileDescription = profileDescription; }

    constructor(profileId, profileDescription) {

        this.#profileId = profileId;
        this.#profileDescription = profileDescription;

    }

    async recoveryProfile() {

        var sql = "SELECT * FROM tb_profiles";
        var rows = await connect.QueryCommand(sql);
        var listProfile = [];

        if (rows.length > 0) {

            for (let i = 0; i< rows.length; i++) {

                listProfile.push(new ProfilesModel(rows[i]["pro_id"], rows[i]["pro_description"]));

            }

        }

        return listProfile;

    }

    async createProfile(proDescription) {

        var sql = 'INSERT INTO tb_profiles (pro_description) VALUES (?)'
        var values = [proDescription];
        var result = connect.NonQueryCommand(sql, values);

        return result;
    }

    async deleteProfile(profileId) {

        var sql = 'DELETE FROM tb_profiles WHERE(pro_id = ?)';
        var values = [profileId];
        var result = connect.NonQueryCommand(sql, values);

        return result;

    }

    async profileIsEmpty(profileId) {

        var sql = 'SELECT p.pro_id FROM tb_profiles p INNER JOIN tb_users u ON p.pro_id = u.pro_id WHERE p.pro_id = ?';
        var values = [profileId];

        return await connect.QueryCommand(sql, values) == 0;

    }

}

module.exports = ProfilesModel;
