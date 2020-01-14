var fs=require('fs');
var path=require('path');

var helpers=require('./helpers');
// container for the module to be exported
var lib ={};
// Base directory of the data folder
lib.baseDir=path.join(__dirname,'/../.data/');

// write data to file

lib.create=function(dir,file,data,callback){
  // open the file for writing

  fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor)
{
  if(!err && fileDescriptor){
    // convert data to string
    var stringData=JSON.stringify(data);
    // write to file and close it
    fs.writeFile(fileDescriptor,stringData,function(err){
      if(!err){
        fs.close(fileDescriptor,function(err){
          if(!err){
            callback(false);
          }else{
            callback('Error while closing file');
          }
        });
      }else{
        callback('Error while writing to new file');
      }
    });
  }else{
    callback('Could not create new file,it already exits');
  }
});
};
// Read dat from a file

lib.read=function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
    callback(err,data);
    if(!err && data){
      var parsedData=helpers.parseJsonToObject(data);
      callback(false,parsedData);
    }else{
      callback(err,data);
    }
  })
}

// Update data in an existing file
lib.update=function(dir,file,data,callback){
  // open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      // convert data into string
      var stringData=JSON.stringify(data);
      // Truncate the file
      fs.ftruncate(fileDescriptor,function(err){
        if(!err){
          // write to the file and close it
          fs.writeFile(fileDescriptor,stringData,function(err){
            if(!err){
              fs.close(fileDescriptor,function(err){
                if(!err){
                  callback(false);
                }else{
                  callback('Error while closing existing file');
                }
              });
            }
          })
        }else{
          callback('Error while truncating')
        }
      })
    }
  });
};

// Delete file
lib.delete=function(dir,file,callback){
  // unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    if(!err){
      callback(false);
    }else{
      callback('Error deleting the file');
    }
  })
}

module.exports=lib;
