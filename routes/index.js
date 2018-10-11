var express = require('express');
var router = express.Router();
var cutoAlgorithm = require('./cutoAlgorithm');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var cutoAlgorithm = require('./cutoAlgorithm');


//var url = 'mongodb://localhost:27017/cuto';
var url = 'mongodb://amadrazo:madrazo97@ds125953.mlab.com:25953/cuto';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function(req,res,next){
  var resultArray = [];
  //open connection.
  mongo.connect(url,function(err,db){
    //check if there is no error.
    assert.equal(null,err);
    //if there is no error. 
    var cursor = db.collection('url_data').find();
    //run through all items our cursos points to.
    cursor.forEach(function(doc, err){
      //check if there is no error.
      assert.equal(null,err);
      //if there is no error. 
      //push current pointing doc to ressults array.
      resultArray.push(doc);
    }, function(){
      db.close();
      //after fetching data -> render index view.
      // pass items => resultArray
      res.render('index',{items: resultArray, last: resultArray[resultArray.length -1]});
    });
  });
});

router.get('/get-all', function(req,res,next){
  var resultArray = [];
  //open connection.
  mongo.connect(url,function(err,db){
    //check if there is no error.
    assert.equal(null,err);
    //if there is no error. 
    var cursor = db.collection('url_data').find();
    //run through all items our cursos points to.
    cursor.forEach(function(doc, err){
      //check if there is no error.
      assert.equal(null,err);
      //if there is no error. 
      //push current pointing doc to ressults array.
      resultArray.push(doc);
    }, function(){
      db.close();
      //after fetching data -> render index view.
      // pass items => resultArray
      res.render('all',{items: resultArray});
    });
  });
});



router.post('/insert', function(req,res,next){
  var time = new Date();
  var nextid = cutoAlgorithm.getid();
  var cuto = nextid.toString();
  var url2 = req.body.url1;
  var url3 = "https://";
  if (url2.includes("https://")){
    url3 = url2;
  } else if (url2.includes("http://")){
    url3 = url2;
  } else {
    url3 = url3.concat(url2);
  }
  
  var item = {
    ide:cutoAlgorithm.encutar(cuto),
    inurl: url3,
    counter: 0,
    nav: "",
    timeCreated: time,
    expire_at: {type: Date, default: Date.now, expires:3600 }
  };
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    db.collection('url_data').insertOne(item, function(err,result){
      assert.equal(null,err);
      console.log(item);
      console.log(cuto);
      console.log('Item Inserted');
      db.close();
    });
  });
  res.redirect('/');
});

router.post('/update', function(req,res,next){

});

router.post('/delete', function(req,res,next){

});

router.get('/track', function(req,res,next){ 
  res.render('track');
});

router.get('/about', function(req,res,next){ 
  res.render('about');
});

var globalcuto;
var globalres = [];

router.post('/track-data',function(req,res,next){
globalcuto = req.body.cutourl;
mongo.connect(url,function(err,db){
  assert.equal(null,err);
  console.log('conection Established');
  console.log(globalcuto);
  db.close();
  });
  res.redirect('/track');
});

router.get('/track-getdata',function(req,res,next){
  var resultArray3 = [];
  globalcuto = globalcuto.replace('cuto.com/get/','');
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    var myquery3 = {ide: globalcuto};
    var cursor3 = db.collection("url_data").find(myquery3);
    cursor3.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray3.push(doc);
    },function(){
      db.close();
      console.log(resultArray3);
      var results = JSON.stringify(resultArray3);
      res.render('track',{result: results});
    });
  });
});

router.get('/get/:id', function(req,res,next){
  id = "";
  var item2 = [];
  id = id.concat(req.params.id);

  mongo.connect(url,function(err,db){
    var myquery2 = {ide: id};
    var newvalue = {$inc:{counter:1}};
    db.collection("url_data").update(myquery2,newvalue,function(err,res){
      if (err) throw err;
      console.log('counter Up!');
    });
    db.close();
  });


  mongo.connect(url,function(err,db){
  if (err) throw err;
  var myquery = {ide: id};
  console.log(myquery);
  var cursor2 = db.collection("url_data").find(myquery);
  cursor2.forEach(function(doc,err){
    assert.equal(null,err);
    item2.push(doc.inurl);
  }, function(){
    db.close();
    console.log(item2);
    console.log(JSON.stringify(item2));
    item2 = JSON.stringify(item2);
    item2 = item2.replace('["','');
    item2 = item2.replace('"]','');
    console.log(item2);
    var redTo='';
    redTo = redTo.concat(item2);
    console.log(redTo);
    res.status(301).redirect(redTo);
    //res.redirect(redTo);
  });
  /*
  db.collection("url_data").find(myquery).toArray(function(err, result){
    if (err) throw err;
    item2 = result;
    console.log(result.ide);
    
    db.close();
    });*/

  });
});




module.exports = router;
