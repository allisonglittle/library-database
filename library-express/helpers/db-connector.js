var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_ivya',
    password        : 'i8N[WmfYYwQTCFcT',
    database        : 'cs340_ivya'
});

// Export it for use in our application
module.exports.pool = pool;