const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);

// Server will always find an open port.
const port = process.env.PORT || 3001;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});

// List of ice cream flavors
const iceCreams = [];

// Needed to process body parameters for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Default endpoint 
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Inserting an ice cream
app.post('/insertData', (req, res) => {
    const params = req.body;
    iceCreams.push(params.flavor);
    res.redirect('/');
});

// Gets all the ice creams in the array
app.get('/getData', (req, res) => {
    res.send(iceCreams.toString());
});

// TODO: Write a GET request to /count that checks iterates through 
//       the array and sends how many of a certain ice cream flavor 
//       exists to the response.
//       Use req.query.flavor to grab the flavor parameter.
app.get('/count', (req, res) => {
    const flavor = req.query.flavor;
    let count = 0;
    for (let i = 0; i < iceCreams.length; i++) {
        if (iceCreams[i] == flavor) {
            count++;
        }
    }
    res.send(count.toString());
});

// TODO: Write a GET request to /randomFlavor that sends a random 
//       flavor from our array to the response.
app.get('randomflavor', (req,res) => {
    res.send(iceCreams[getRandomNumber()]);
});

// Method that gets a random index from the iceCreams array
function getRandomNumber() {
    const num = Math.floor(Math.random() * iceCreams.length);
    return num;
}