// import express
const express = require('express');
// create an express app
const app = express();

// use to parse req.body in express js 
const bodyParser = require('body-parser');

// specifically parse JSON data and add it ot the request.Body object 
app.use(bodyParser.json());

// create a route 
app.get('/',(req,res) => {
    res.send("hello ashu , kaisa chal rah padhi ");
})

// start the server
app.listen(3000, () => {
    console.log("server is running on port 3000");
});

app.post('/api/cars', (req, res) => {
    const {name, brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car submitted successfully");
})