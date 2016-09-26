var express = require('express')
var app = express()
var request = require('request')
var low = require('lowdb')
var schedule = require('node-schedule');

var db = low('db.json')


app.get('/', function(req, res, next) {

  var rule = new schedule.RecurrenceRule();
  //秒数到10的时候更新
  rule.second = 10;
  var j = schedule.scheduleJob(rule, function() {

    var mydata = {
      page: 1,
      pagesize: 3
    };
    //打印现在时间
    console.log('现在时间：', new Date());
    request.post('https://bird.ioliu.cn/joke/', {
        form: mydata
      },
      function(err, resp, body) {
        console.log(body);
        console.log('===============================================');

        db.set('the', body)
          .value()
      });
  })

  res.send('哈哈')
})

app.listen(3201)
