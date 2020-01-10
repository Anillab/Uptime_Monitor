// depedancies

var http=require('http');
var url=require('url');
var StringDecoder=require('string_decoder').StringDecoder;
var config =require('./config');
// server responds to requests with strings
var server=http.createServer(function(req,res){
  // Get the url and parse it
  var parsedUrl=url.parse(req.url,true)
  // Get the path
  var path =parsedUrl.pathname;
  var trimmedPath=path.replace(/^\/+|\/+$/g,'');
  // Get the query string as an object
  var queryStringObject=parsedUrl.query
  // Get the Http Method
   var method =req.method.toLowerCase();
   // Get the headers of the object
   var headers =req.headers;
   // get the payloads
   var decoder = new StringDecoder('utf-8')
   var buffer ='';
   req.on('data',function(data){
     buffer +=decoder.write(data)
   });
   req.on('end',function(){
     buffer +=decoder.end()

   // choose where the request should go to
   var chosenHandler=typeof(router[trimmedPath]) != 'undefined'? router[trimmedPath]:handlers.notFound;
   var data = {
     'trimmedPath':trimmedPath,
     'queryStringObject':queryStringObject,
     'method':method,
     'headers':headers,
     'payload':buffer
   };
   // Route the request to the handler specified by the router
   chosenHandler(data,function(statusCode,payload){
     // Use the status code called back by thr handler or default back to the object
     statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
     payload = typeof(payload) == 'object' ? payload : {};
     // convert the payload into a string
     var payloadString=JSON.stringify(payload);
     // Return the response
     res.setHeader('Content_Type','application/json')
     res.writeHead(statusCode);
     res.end(payloadString)


  // Send the response
  // log the request path
  console.log('Returning this response:' ,statusCode,payloadString )
 });
});
});
// start the server
server.listen(config.port,function(){
  console.log('The server is listening on port '+ config.port+'in '+config.envName+'mode');
});
// define the handlers
var handlers={};
// sample handlers
handlers.sample=function(data,callback){
  // callback https status and payload object
  callback(406,{'name':'sample handler'})

};
// not found handler
handlers.notFound=function(data,callback){
  callback(404)
}
// Define a request router
var router ={
  'sample':handlers.sample
}
