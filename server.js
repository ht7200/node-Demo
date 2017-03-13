var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;

		if(pathname == "/favicon.ico"){
			//console.log("屏蔽/favicon.ico请求");
			return;
		}

		//2.收到监听请求
		console.log("2.Request for " + pathname + " received.");

		request.setEncoding("UTF-8");
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});
		request.addListener("end", function(){
			route(handle, pathname, response, postData);
		});

		

		// //response改到route里面去处理
		// response.writeHead(200, {"Content-Type":"text/plain"});
		// response.write("hello world!");
		// response.end();
	}

	//1.创建http服务器，并启动监听
	http.createServer(onRequest).listen(8888);	
	console.log("1.Server has started.");
}

exports.start = start;


// http.createServer(function(request, response){
// 	response.writeHead(200, {"Content-Type":"text/plain"});
// 	response.write("hello world!");
// 	response.end();
// }).listen(8888);