const Database = require('../db/database');

const connect = new Database();

class UsersModel {

    #userId; #userName; #userEmail; #userActive; #userPassword; #profileId; #profileDescription;

    get userId() { return this.#userId; } set userId(userId){ this.#userId = userId; }
    get userName() { return this.#userName; } set userName(userName){ this.#userName = userName; }
    get userEmail() { return this.#userEmail; } set userEmail(userEmail){ this.#userEmail = userEmail; }
    get userActive() { return this.#userActive; } set userActive(userActive){ this.#userActive = userActive; }
    get userPassword() { return this.#userPassword; } set userPassword(userPassword){ this.#userPassword = userPassword; }
    get profileId() { return this.#profileId; } set profileId(profileId){ this.#profileId = profileId; }
    get profileDescription() { return this.#profileDescription; } set profileDescription(profileDescription) { this.#profileDescription = profileDescription; }

    constructor( userId, userName, userEmail, userActive, userPassword, profileId, profileDescription ) {

        this.#userId = userId;
        this.#userName = userName;
        this.#userEmail = userEmail;
        this.#userActive = userActive;
        this.#userPassword = userPassword;
        this.#profileId = profileId;
        this.#profileDescription = profileDescription;

    }

    async getUser(id) {

        var sql = 'SELECT * FROM tb_users WHERE user_id = ?';
        var values = [id];
        var rows = await connect.QueryCommand(sql, values);

        if (rows.length > 0) {

            let user = new UsersModel();
            user.userId = rows[0]['user_id'];
            user.userName = rows[0]['user_name'];
            user.userEmail = rows[0]['user_email'];
            user.userActive = rows[0]['user_active'];
            user.userPassword = rows[0]['user_password'];
            user.profileId = rows[0]['pro_id'];

            return user;

        }

        return null;

    }

    async createUser() {

        if (this.#userId == 0){

            let sql = 'INSERT INTO tb_users (user_name, user_email, user_active, user_password, pro_id) VALUES (?, ?, ?, ?, ?)';
            let values = [this.#userName, this.#userEmail, this.#userActive, this.#userPassword, this.#profileId];
            let result = await connect.NonQueryCommand(sql, values);

            return result;

        }
        else {

            let sql = 'UPDATE tb_users SET user_name = ?, user_email = ?, user_active = ?, user_password = ?, pro_id = ? WHERE user_id = ?';
            let values = [this.#userName, this.#userEmail, this.#userActive, this.#userPassword, this.#profileId, this.#userId];
            let result = await connect.NonQueryCommand(sql, values);

            return result;

        }

    }

    async recoveryUsers() {

        var list = [];
        var sql = "SELECT * FROM tb_users u INNER JOIN tb_profiles p ON u.pro_id = p.pro_id";
        var rows = await connect.QueryCommand(sql);

        for (let i=0; i<rows.length; i++) {

            let row = rows[i];
            let user = new UsersModel(row["user_id"], row["user_name"], row["user_email"], row["user_active"], row["user_password"], row["pro_id"], row["pro_description"]);
            list.push(user);

        }

        return list;

    }

    async deleteUser(id) {

        var sql = "DELETE FROM tb_users WHERE user_id = ?";
        var values = [id];
        var result = await connect.NonQueryCommand(sql, values);

        return result;

    }

    async authenticateUser(email, password) {

        var sql = "SELECT * FROM tb_users WHERE user_email = ? AND user_password = ? AND user_active = 'Y'";
        var values = [email, password];
        var rows = await connect.QueryCommand(sql, values);

        if (rows.length > 0) {

            return new UsersModel(rows[0]["user_id"], rows[0]["user_name"], rows[0]["user_email"], rows[0]["user_active"], rows[0]["user_password"], rows[0]["pro_id"]);

        }
        
        return null;

    }
    
}


module.exports = UsersModel;