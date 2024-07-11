var mysql =require('mysql2')

exports.connection = mysql.createConnection({
    host:"localhost", //it is the server name which is used for url mapping
    user:"root",
    password:"root",
    database:"master_table"
    // port:"3307" this is the port number but we can edit it accordingly
})