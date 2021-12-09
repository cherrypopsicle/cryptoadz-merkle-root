async function main() {
  var http = require("http");


  callback = function (response) {
    var str = "";

    //another chunk of data has been received, so append it to `str`
    response.on("data", function (chunk) {
      str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on("end", function () {
      console.log(str);
    });

    response.on("error", function (err) {
      console.log(err);
    });
  };
  
  var options = {
    host: "localhost",
    port: 8081,
    path: "/ipfs/QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1",
  };
  http.request(options, callback).end();
}

main();
