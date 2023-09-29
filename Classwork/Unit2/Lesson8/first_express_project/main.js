/* To start using Express.js, you need to create a main application file and require the express module. 

You require Express.js by referring to the module name express and storing it as a constant.

Express offers a library of methods and functionality, including a class with built-in web server functionality.
The express web server application is instantiated and stored in a constant to be referred to as app. Throughout
the rest of the project, you’ll use app to access most of Express.js’ resources. 

*/

//Listing 8.1 Simple Express.js web application in main.js

const port = 3000,
    //add the express module to your application
    express = require("express"),
    app = express(); //Assign the express application to the app constant. 

app.get("/", (req, res) => { //Set up a GET route for the home page
    
    res.send("Hello, Universe!"); //Isue a response from the server to the client with rs.send 
    //Listing 8.2 Request object methods in Express.js in main.js
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    
})

    //Set up application to listen on port 3000
    .listen(port, () => {
        console.log(`The Express.js server has started and is listening on port number: ${port}`);
    })