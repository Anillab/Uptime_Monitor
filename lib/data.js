var fs=require('fs');
var path=require('path');

// container for the module to be exported
var lib ={};
// Base directory of the data folder
lib.baseDir=path.join(__dirname,'/../.data/');

