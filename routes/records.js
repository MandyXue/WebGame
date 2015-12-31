var express = require('express');
var router = express.Router();

var recordDao = require('../dao/recordDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.render('updateRecord');
});


// 增加用户
//TODO 同时支持get,post
router.get('/addRecord', function(req, res, next) {
    recordDao.add(req, res, next);
});

//获取全部
router.get('/queryAll', function(req, res, next) {
    console.log('查询所有record');
    recordDao.queryAll(req, res, next);
});

//查询id
router.get('/query', function(req, res, next) {
    recordDao.queryById(req, res, next);
});

//获取前三
router.get('/queryThree', function(req, res, next) {
    console.log('query three');
    recordDao.queryThree(req, res, next);
})

router.post('/updateRecord', function(req, res, next) {
    recordDao.update(req, res, next);
});

module.exports = router;

