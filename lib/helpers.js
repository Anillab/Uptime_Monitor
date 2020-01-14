// Dependancies

var crypto=require('crypto');
var config=require('../config');
// module to export
var helpers ={};

// SHA256
helpers.hash=function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash=crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    return hash;
  }else {
    return false;
  }

}
// Parse json string to object
helpers.parseJsonToObject=function(str){
  try {
    var obj =JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
}
