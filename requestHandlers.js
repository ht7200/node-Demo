var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");

//4.处理监听请求
function start(response, postData){
	console.log("4.start handle");
	 
	//单文本框
	var body =  '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; '+'charset=UTF-8" />'+
				'</head>'+
				'<body>'+
				'<form action="/upload" method="post">'+
				'<textarea name="text" rows="20" cols="60"></textarea>'+
				'<input type="submit" value="提交" />'+
				'</form>'+
				'</body>'+
				'</html>';
	
	// //图片上传框
	// var body = 	'<html>'+
	// 			'<head>'+'<meta http-equiv="Content-Type" '+
	// 			'content="text/html; charset=UTF-8" />'+
	// 			'</head>'+
	// 			'<body>'+
	// 			'<form action="/upload" enctype="multipart/form-data" '+
	// 			'method="post">'+
	// 			'<input type="file" name="upload">'+
	// 			'<input type="submit" value="上传文件" />'+
	// 			'</form>'+
	// 			'</body>'+
	// 			'</html>';

	response.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
	response.write(body);
	response.end();
}

function upload(response, postData){
	console.log("4.upload handle");
	response.writeHead(200, {"Content-Type":"text/plain;charset=UTF-8"});
	response.write("Upload data:" + querystring.parse(postData).text);
	response.end();
}

function show(response, postData){
	console.log("4.show handle");
	//硬编码显示本地文件
	fs.readFile("C:/Users/SCZs/Desktop/studyFolder/nodejs/dataUpload/tmp/爱情.jpg", "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-Type":"text/plain;charset=utf-8"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type":"image/jpg"});
			response.write(file, "binary");
			response.end();
		}
	});
}

// //测试错误的非阻塞操作exec//结果：返回empty
// var exec = require("child_process").exec;
// function start(){
// 	//4.处理监听请求
// 	console.log("4.Request handle 'start' was called");
// 	var content = "empty";
// 	exec("dir", function(error, stdout, stderr){
// 		content = stdout;
// 		console.log("5." + content);
// 	});
// 	return content;
// }

// //测试非阻塞操作//###这里timeout: 10000好像没用
// function start(response){
// 	console.log("4.start handle");
// 	//4.处理监听请求
// 	exec("dir", {timeout: 10000, maxBuffer: 20000*1024}, function(error, stdout, stderr){
// 		response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
// 		response.write(stdout);
// 		response.end();
// 	});
// }

exports.start = start;
exports.upload = upload;
exports.show = show;