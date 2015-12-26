var express = require('express');
var router = express.Router();

var userDao = require('../dao/recordDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.render('updateRecord');
});


// 增加用户
//TODO 同时支持get,post
router.get('/addRecord', function(req, res, next) {
    userDao.add(req, res, next);
});


router.get('/queryAll', function(req, res, next) {
    console.log('查询所有record');
    userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
    userDao.queryById(req, res, next);
});

// router.get('/deleteUser', function(req, res, next) {
//     userDao.delete(req, res, next);
// });

router.post('/updateRecord', function(req, res, next) {
    userDao.update(req, res, next);
});

module.exports = router;

