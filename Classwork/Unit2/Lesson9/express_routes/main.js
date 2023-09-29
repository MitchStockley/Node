//creating a route with parameters, and respond with that parameter. 

 homeController = require("./controllers/homeController");

const port = 3000,
    express = require("express"),
    app = express();
    homeController = require("./controllers/homeController");

    

// app.get("/items/:vegetable", (req, res) => {  //add a route to get url parameters
//     let veg = req.params.vegetable;
//     res.send(`This is the page for ${veg}`);
// });

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
/*  
If a request is made to /items/lettuce, the request is processed first by your
 middleware function and then by the app.get("/items/:vegetable") 
 route you created previously.
 */
app.use((req, res, next) => { //Define a middle ware function
    console.log(`request made to: ${req.url}`); //log the requests path to console.
    next();  //Call the next function
})
//specify that you want to parse incoming requests that are URL-encoded
app.use(
    express.urlencoded({
        extended: false
    })
);
//Tell your Express.js application to parse URL-encoded data.
app.use(express.json());
// create a new route for posted data.
app.post("/", (req, res) => {  //Create a new post route for the home page.
    console.log(req.body); //Log the request’s body
    console.log(req.query);
    res.send("POST Successful!");
});

app.get("/items/:vegetable", homeController.sendReqParam); //Handle GET requests to "/items/:vegetable"