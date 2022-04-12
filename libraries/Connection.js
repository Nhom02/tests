const mysql = require('mysql');
class Connection{
    constructor(host, user, password, database){
        this.conn = mysql.createConnection({
                host: host? host:testConfig.databaseCred.host,
                user: user? user:testConfig.databaseCred.user,
                password: password? password:testConfig.databaseCred.password,
                database: database? database:testConfig.databaseCred.database,
            });
    }

}

module.exports = new Connection();
