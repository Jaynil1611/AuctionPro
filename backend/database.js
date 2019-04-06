const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'secureonlineauction.cnzzbypo4cdl.ap-south-1.rds.amazonaws.com',
    user: 'Jaynil',
    database: 'SecureOnlineAuction',
    password: 'jaynil123',
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

module.exports=pool;
