
//introduction to express//creating basic web server with express
// const express = require('express')
// const app = express() //calls express function to start new express app
// app.listen(3000,() => {
//     console.log("App listening on port 3000")
// })

//handeling requests with express 

// const express = require('express')
// const app = express()
// const path = require('path')

// app.listen(3000, () => {
//     console.log("App listening on port 3000")
// })
// app.get("/about", (req, res) => {
//     res.json({
//         name: 'Greg Lim'
//     })
// })

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'index.html'))
// })
// // serving other html files

// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'about.html'))
// })

// app.get('/contact', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'contact.html'))
// })


//serving static files with express.js - Page 31

/*app.use is a special function to increase functionality with Express by adding a function to our application’s
middleware stack. We will discuss more on middleware in a dedicated chapter later on.

express.static is a packaged shipped with Express that helps us serve static files. With express.static(‘public’),
we specify that any request that ask for assets should get it from the ‘public’ directory. */

const express = require('express')
const app = express() //calls express function to start new express app
const path = require('path')
app.use(express.static('public'))
app.listen(3000,() => {
    console.log("App listening on port 3000")
})

 app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'))
    })
    // serving other html files
    
    app.get('/about', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'about.html'))
    })
    
    app.get('/contact', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'contact.html'))
    })

