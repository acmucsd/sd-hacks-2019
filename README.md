# SD Hacks Workshop: Building a Server in Javascript
Welcome! This repository contains all materials for our Javascript workshop at SD Hacks. 

[Slides](https://docs.google.com/presentation/d/1u4KKzP2pT8GfzbuFnnt82LHxgaDQcR92lE-HOOa5D9o/edit?usp=sharing)

## Installing Node.js 
Let's install node.js into our computers. Here are some links that you can follow to get it installed, based on the OS that you run.

[Windows](https://nodesource.com/blog/installing-nodejs-tutorial-windows/) \
[Mac OS](https://www.webucator.com/how-to/how-install-nodejs-on-mac.cfm)

## How do I JavaScript? 
A quick introduction to JavaScript: 

### Variables
We define variables with three keywords: `let`, `var`, and `const`: 
```javascript
let a = 3;
var b = "three";
const c = 3.14;
```
Nowadays, `let` is preferred over `var` due to the fact that `let` is scoped locally (inside the block in which it is defined) and `var` is scoped globally. 

### Functions
We define functions using either the `functions` keyword or arrow notation: 
```javascript
function sum(a,b) {
  return a + b;
}

sum = (a,b) => a+b;
```
There are key differences between the two, though we'll be using them interchangably in this workshop. 

For more information, check out our Hack School workshop on JavaScript [here](https://github.com/acmucsd/hackschool/tree/master/part-2-intro-to-backend)!

## What is a server? 
A server is a computer that distributes content to all "clients" that connect to it through the internet. A server may have different routes so that depending on what each client wants, the server can send different content. We'll be making our server today in Node.js and using it to display some data that you input!

Servers communicate with each other with the HTTP (HyperText Transfer Protocol), which defines many kinds of different requests that clients can make to servers. 

We'll be using a Node.js package called Express, and that will make it much easier for us to create routes and serve different content to the client-side.

## Before we get started...
Clone the repo and type:
```
npm init
```
This will auto-generate a file called `package.json`, which will contain all information about the application, including a description, how to start it, and a list of all packages the application depends on. The command line will prompt you for some basic information, just hit enter on everything for now.  

## Code! 

### The Basics
A basic Express server will look like this:
```javascript
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

// Server will always find an open port.
const port = process.env.PORT || 3001;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});
```
The first few lines are just importing packages and setting everything up, and every Express server will have those lines (this type of code is sometimes called boilerplate). The last four lines are what we actually need to run our server. We specify the port number, then we call server.listen(), which takes the port number, and a callback function that lets us know on the command line that the server is on (more information about callbacks at Appendix A).

### Routes
```javascript
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/insertData', (req, res) => {
    const params = req.body;
    iceCreams.push(params.flavor);
    res.redirect('/');
});

app.get('/getData', (req, res) => {
    res.send(iceCreams.toString());
});
```
We're only using two types of HTTP requests: GET requests, usually used to retrieve content from a server, and POST requests, usually used to send data to a server. 

Our first route is the home route, which will display the main site (all html is provided!) Our example contains a basic form where you can fill in your favorite ice cream flavor. 

The second route is for processing whatever form data the user inputs. When you hit "Submit", the web page will send a POST request to the "/insertData" route. We're adding that data to an array here, but normally you would store that data in some kind of database.

The final route will just send the list of ice cream flavors in plain text. Again, we would normally use a database to store this data.


### To-dos: 
We want to make two new routes: one to get the number of people who voted for a certain ice cream flavor, and the other to get a random flavor from our array. Based on the example code, see if you can fill in the blanks yourself!


## You're done! 
Congratulations! You've built a basic Express server! We hope this newfound knowledge will be useful for your hacking endeavors! Good luck to all of you!

## Appendix A: Callback Functions
You may have noticed that we're passing functions into our route functions, which seems strange at first sight, though there is a reason behind it. These are called callback functions, and we need them because our route function calls need to be *asynchronous*, meaning that they don't necessarily run in sequence. We want each route to serve its corresponding content immediately when a client connects, so to achieve this, all these functions take a callback function as an argument, and the callback will be called whenever the function finishes running, which in our case is whenever someone connects to a certain route. 
