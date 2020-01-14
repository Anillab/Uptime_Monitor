// Dependecies
var _data=require('./data');
var helpers =require('./helpers');
// define the handlers
var handlers={};
// Users handlers
handlers.users=function(data,callback){
  var acceptableMethods=['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  }else{
    callback(405);
  }
};

// conatiner for the users submethods
handlers._users={};
// Required data:firstname,lastname,phone,password,toSAgreement

