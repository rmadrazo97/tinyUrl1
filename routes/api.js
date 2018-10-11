var express = require('express');
var router = express.Router();
var cutoAlgorithm = require('./cutoAlgorithm');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

//var url = 'mongodb://localhost:27017/cuto';
var url = 'mongodb://amadrazo:madrazo97@ds125953.mlab.com:25953/cuto';


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("Cuto API Hello World")
  //res.render('index', { title: 'Cuto Url API' });
});

router.get('/cuto/:url', function(req,res,next){
  var Url = req.params.url;
  var Url = cutoAlgorithm.encutar(Url);
  res.render('api',{id: Url});
});

  router.get('/:url', function(req,res,next){
    var time = new Date();
    var Url1 = "https://";
    var Url2 = req.params.url;
    
    if (Url2.includes("https://")){
      Url1 = Url2;
    }else if (Url2.includes("http://")){
      Url1 = Url2;
    } else {
      Url1 = Url1.concat(Url2);
    }
    var nextid = cutoAlgorithm.getid();
    nextid = nextid.toString();
    var cuto = cutoAlgorithm.encutar(nextid);
    var item = {
      ide: cuto,
      inurl: Url1,
      counter: 0,
      nav: "",
      timeCreated: time,
      expire_at: {type: Date, default: Date.now, expires:3600 }
    }
    mongo.connect(url,function(err,db){
      assert.equal(null,err);
      db.collection('url_data').insertOne(item, function(err,result){
        assert.equal(null,err);
        console.log('Item Inserted');
        db.close();
      });
    });
    console.log(Url1);
    console.log(nextid);
    console.log(cuto);
    console.log(item);
    res.render('api',{cutoin: cuto});
  });
  

//router.post('cuto/submit')


module.exports = router;
