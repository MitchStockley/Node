const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    router = require("./router"),
    contentTypes = require("./contentTypes"),
    utils = require("./utils");

    //Registering individual routes with the router module in main.js below

    /* Registering my routes essentially means passing a URL and callback function to
my router.get or router.post function, depending on which HTTP method I’m han-
dling. Those functions add my routes to router.routes, a JavaScript object that maps my
URLs to the callback functions to be invoked when that URL is accessed */

router.get("/", (req, res) => { //Add a series of routes for web pages and assets.
    res.writeHead(httpStatus.OK, contentTypes.htm);
    utils.getFile("views/index.html", res);
});
router.get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/courses.html", res);
});
router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/contact.html", res);
});
router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/thanks.html", res);
});
router.get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    utils.getFile("public/images/graph.png", res);
});
router.get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/people.jpg", res);
});
router.get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/product.jpg", res);
});
router.get("/confetti_cuisine.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/confetti_cuisine.css", res);
});
router.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap.css", res);
});
router.get("/confetti_cuisine.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    utils.getFile("public/js/confetti_cuisine.js", res);
});
http.createServer(router.handle).listen(port); //Start the server.
console.log(`The server is listening on port number: ${port}`);

/* In this capstone exercise, I built a complete web application serving static web pages for
Confetti Cuisine. To accomplish this task, I required my own router module into the
main application file. Then I created a custom system for routing user requests to serve
specific content. After building custom functions to register routes in an organized and
systematic way, I created views and assets to be served from their respective directories.*/