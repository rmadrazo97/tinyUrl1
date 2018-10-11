var anyBase = require('any-base');
var mongo = require('mongodb');
/* 
//Creating Mongo database.
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cuto";
//Connectring to Database.
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/

//encutador
ShortId = anyBase(anyBase.DEC,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-');
longId = anyBase('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-', anyBase.DEC );

function getid(){
    var num = Math.floor(Math.random()*1000000000001);
    return num
}

function encutar(inurl){
    return ShortId(inurl)
}
function alargar(id){
    return longId(id)
}

module.exports.encutar = encutar;
module.exports.alargar = alargar;
module.exports.getid = getid;