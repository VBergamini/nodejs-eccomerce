var mysql = require('mysql2');

class Database {

    #connect;

    get connect() { return this.#connect;} 
    set connect(connect) { this.#connect = connect; }

    constructor() {

        this.#connect = mysql.createPool({
            host: '132.226.245.178',
            database: 'PFS1_10442221580',
            user: '10442221580',
            password: '10442221580',
        });
        
    }

    QueryCommand(sql, values) {
        var cnn = this.#connect;
        return new Promise(function(res, rej) {
            cnn.query(sql, values, function (error, results, fields) {
                if (error) 
                    rej(error);
                else 
                    res(results);
            });
        })
    }
    
    NonQueryCommand(sql, values) {
        var cnn = this.#connect;
        return new Promise(function(res, rej) {
            cnn.query(sql, values, function (error, results, fields) {
                if (error) 
                    rej(error);
                else 
                    res(results.affectedRows > 0);
            });
        })
    }

    LastInsertedCommand(sql, values) {
        var cnn = this.#connect;
        return new Promise(function(res, rej) {
            cnn.query(sql, values, function (error, results, fields) {
                if (error) 
                    rej(error);
                else 
                    res(results.insertId);
            });
        })
    }

}

module.exports = Database;



