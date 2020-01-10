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
  // Send the response
  res.end('Hello World\n');
  // log the request path
  console.log('Request received with these headers:' ,headers )

});
// start the server and have it listrn on port 3000
server.listen(3000,function(){
  console.log('The server is listening on port 3000')
})
