"use strict";
//Listing 5.1 A simple server with a request event listener in main.js
const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer();

app.on("request", (req, res) => { //Listen for requests.
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  let responseMessage = "<h1>This will show on the screen.</h1>";
  res.end(responseMessage); //respond with html
});

app.listen(port);
console.log(`The server has started and is listening on port number:${port}`);

//Run node main in terminal and visit http:// localhost:3000/ in your web browser to view
// the response containing one line of HTML on the screen.