// dao/userSqlMapping.js
// CRUD SQL语句
var record = {
    insert:'INSERT INTO record(record, username) VALUES(?,?)',
    update:'update record set name=?, age=? where id=?',
    //delete: 'delete from record where id=?',
    queryById: 'select * from record where id=?',
    queryAll: 'select * from record',
    queryThree: 'SELECT record, username FROM record ORDER BY record DESC LIMIT 3'
};

module.exports = record;