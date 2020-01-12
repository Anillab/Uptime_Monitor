// depedancies

var http=require('http');
var https=require('https');
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
var fs=require('fs');

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
// server responds to requests with strings
var httpServer=http.createServer(function(req,res){
  unifiedServer(req,res);
});
// start the nttp server
httpServer.listen(config.httpPort,function(){
  console.log('The server is listening on port '+ config.httpPort);
});
// start the server
server.listen(config.port,function(){
  console.log('The server is listening on port '+ config.port+'in '+config.envName+'mode');
var httpsServerOptions={
  'key': fs.readFileSync('./https/key.pem'),
  'cert':fs.readFileSync('./https/cert.pem')
}
// instantiate the https server
var httpsServer=https.createServer(httpsServerOptions,function(req,res){
  unifiedServer(req,res);
});
httpsServer.listen(config.httpsPort,function(){
  console.log('The server is listening on port '+ config.httpsPort);
});
// Server logic for both http and https server
var unifiedServer= function(req,res){
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

};

// define the handlers
var handlers={};
handlers.sample=function(data,callback){
  // callback https status and payload object
  callback(406,{'name':'sample handler'})
// ping handlers
handlers.ping=function(data,callback){
  // callback https status
  callback(200)

};
// not found handler
handlers.notFound=function(data,callback){
  callback(404)
}
// Define a request router
var router ={
  'sample':handlers.sample
}
