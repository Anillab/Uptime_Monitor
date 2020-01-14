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

// users post
handlers._users.post=function(data,callback){
  console.log(data);
  // check that all required data has been filled out
var firstName=typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim(): false;
var lastName=typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim(): false;
var phone=typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim(): false;
var password=typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim(): false;
var toSAgreement=typeof(data.payload.toSAgreement) == 'boolean' && data.payload.toSAgreement == true  ? true: false;

if (firstName && lastName && phone && password && toSAgreement){
  // we use the phone to ensure that the user did not exist already
  _data.read('users',phone,function(err,data){
    if(err){
      // hash the password

      var hashedPassword=helpers.hash(password);
        if(hashedPassword){
          var userObject={
            'firstName':firstName,
            'lastName':lastName,
            'phone':phone,
            'hashedPassword':hashedPassword,
            'toSAgreement':true
          };
          // store the user
          _data.create('users',phone,userObject,function(err){
            if(!err){
              callback(200);
            }else {
              console.log(err);
              callback(500,{'Error':'Could not create user'})
            }
          });

        }else {
          callback(500,{'Error':'Could not hash the password'})
        }


    }else{
      callback(400,'Error ,user already exists');
    }
  });
}else{
  callback(400,{"Error": "while filling required fields"});
}
};
// users get
// Required data :phone
// TODO: only let authenticated users access their object
handlers._users.get=function(data,callback){
// check that the phone number is provided
var phone=typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false
if(phone){
_data.read('users',phone,function(err,data){
  if(!err && data){
    // #remove ahshed pasword
     delete data.hashedPassword;
     callback(200,data);
  }else{
    callback(404);
  }
})
}
}
// users put
// required data: phone
// optional data to update:firstName,lastName,password
// TODO: only authenticated users update their own object
handlers._users.put=function(data,callback){
  // check required fileds
  var phone=typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim(): false;
// optional fields

var firstName=typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim(): false;
var lastName=typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim(): false;
var password=typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim(): false;
// error if the phone is invalid

if(phone){
  // error if there is nothing to update
  if(firstName || lastName || password){
    // look up Users

    _data.read('users',phone,function(err,userData){
      if(!err && userData){
        // update the fields
        if(firstName){
          userData.firstName=firstName
        }
        if (lastName){
          userData.lastName=lastName
        }
        if(password){
          userData.hashedPassword=helpers.hash(password);

        }
        // store the new Update
        _data.update('users',phone,userData,function(err){
          if(!err){
            callback(200)
          }else {
            console.log(err);
            callback(500,{"Error":"could not update user"})
          }
        })
      }else{
        callback(400,{"error":"specified user does not exist"})
      }
    })
  }else{
    callback(400,{"Error": "Missing fields to update"})
  }
}else{
  callback(400,{'Error':'Missing required fields'})
}
}
// users
// Required fields : phone
handlers._users.delete=function(data,callback){
// check whether the phone number is valid
var phone=typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false
if(phone){
  // look up the user
_data.read('users',phone,function(err,data){
  if(!err && data){
    _data.delete('users',phone,function(err){
      if(!err){
        callback(200)
      }else{
        callback(500,{"Error":"Could not delete user"})
      }
    })
  }else{
    callback(400,{"Error":"Could not find the user"});
  }
})
}
}


// ping handlers
handlers.ping=function(data,callback){
  // callback https status
  callback(200)

};
// not found handler
handlers.notFound=function(data,callback){
  callback(404)
}

module.exports=handlers;
