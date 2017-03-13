function route(handle, pathname, response, postData){
	//3.路由监听请求
	console.log("3.About to route a request for " + pathname);
	if(typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else {
		console.log("3.No request handle found for " + pathname);
		response.writeHead(404, {"Content-Type":"text/plain;charset=UTF-8"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;