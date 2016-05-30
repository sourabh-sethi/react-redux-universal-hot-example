//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8051; 

//We need a function which handles requests and send response
function handleRequest(request, response){
//    response.statusCode(200);
    response.setHeader('Content-Type','application/json');
    response.end('{"data":{"result":[{"title":"Live class to be added in course","startAt":"2013-06-15T06:48:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53344,"classUrl":"/online-class/49389-live-class-to-be-added-in-course","recordingStatus":"Done","recordingRequestLink":"450","seoClassName":"/online-class/49389-live-class-to-be-added-in-course","idClassMaster":111},{"title":"Live class to be added in course","startAt":"2013-06-15T06:48:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53345,"classUrl":"/online-class/49390-live-class-to-be-added-in-course","recordingStatus":"Done","recordingRequestLink":"45p   ","seoClassName":"/online-class/49390-live-class-to-be-added-in-course","idClassMaster":49390},{"title":"Live class to be added in course","startAt":"2013-06-15T06:48:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53346,"classUrl":"/online-class/49391-live-class-to-be-added-in-course","recordingStatus":"Done","recordingRequestLink":"45q","seoClassName":"/online-class/49391-live-class-to-be-added-in-course","idClassMaster":45990}],"meta":{"page":0,"pageSize":10,"totalPages":4,"order":"ASC","sortField":"TIME"}},"success":true,"errorCode":0}');
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
