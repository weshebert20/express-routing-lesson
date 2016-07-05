# Robots Righting HTML
## Intro to express and express-routing

### Objectives
*After this lesson, students will be able to:*

- Use and configure middleware
  - We'll use body-parser to parse form submissions as JSON
- Write out the skeleton of a RESTful API
- Identify the HTTP verbs we'll be using for an API
- Use Nodemon to 

### Preparation
*Before this lesson, students should already be able to:*

- Explain HTTP requests/responses
- Write and explain basic javascript

## Recapping Node and Intro to Express - Intro (5 mins)

#### First let's review

* What is Node?

Node is a low-level, non-blocking, event-driven platform which allows you to write JavaScript on the server-side.

* What is npm?

npm is Node's package manager. It's used to manage dependencies. Think of it like RubyGems.

* What is express.js?

Express.js is a simple web framework for Node.js. It provides many features for you to start using right away (Routing, Sessions) that you would have to do yourself if using vanilla Node.

## Adding Routes to our app 

Let's add some routes. This should all be familiar but let's go through it.

Suppose we have a simple app like we created in Learnyounode

```javascript
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;

app.get('/api/parsetime', function(req, res) {
  time = new Date();
  result = {
    hour: time.getHours(),  
    minute: time.getMinutes(),  
    second: time.getSeconds()  
  }  

  res.send(result);
});

app.get('/api/unixtime', function(req, res) {
  time = new Date();
  
  res.send({ unixtime : time.getTime() });
});

app.listen(port);
```

[CFU]: # (What does this app do?) 

This app works but as we keep adding more endpoint, we'll end up creating more routes

## Node Modules

One way we can start to break up Node apps, including Express apps, is to use modules. If there is some code that makes sense to 
try to keep encapsulated, like the information around routes, we can use group that code into a single file to help focus on what 
that specific code does.

To use modules, we can write code that solves one problem and then export a single object to the rest of the program. Often this 
will be a constructor for an ADT but it might be just a plan JavaScript object that includes a couple of related methods. This 
sounds limiting but it

## Creating a controller 

## Restful Routing - Intro

We are going to use the RESTful standard to build our web apps. REST stands for REpresentational State Transfer and is an organizational standard for web architecture designed "to induce performance, scalability, simplicity, modifiability, visibility, portability, and reliability," in the words of its author, Roy Thomas Fielding.

So far, we've covered how to handle GET requests, but we can create callbacks for all types of requests. For example, if we want to create a restful controller for the resource cars, it would look like this:

```javascript

var carRouter = express.Router();

carRouter.get('/', function(req, res) {
  // INDEX
});

carRouter.get('/:id', function(req, res) {
  // SHOW
});

carRouter.get('/new', function(req, res) {
  // NEW
});

carRouter.post('/', function(req, res) {
  // CREATE
});

carRouter.get('/:id/edit', function(req, res) {
  // SHOW
});

carRouter.put('/:id', function(req, res) {
  // UPDATE
});

carRouter.delete('/:id', function(req, res) {
  // DELETE
});


app.use("/cars", carRouter)
```

We've defined that the endpoint for the car resource will be "/cars".
So the code above will create these 7 routes:

```javascript

GET    /cars
GET    /cars/:id
GET    /cars/new
POST   /cars
GET    /cars/:id/edit
PUT    /cars/:id
DELETE /cars/:id

```

## BodyParser and handling params/JSON

When data is sent to the server via a POST request (from a form, for example), the content of the request is passed as a string, 
but we want to access it as if it was a JavaScript object:

If we have a form like this:

```html
    <form>
      <input type="text" name="car[make]">
      <input type="text" name="car[model]">
    </form>
```

Once this form is submitted, by default, the data on the server will look like this:

```json
{
  "car[make]"  : "value",
  "car[model]" : "value"
}
```

...but this is not really convenient, as accessing the data will be a bit complex to parse:

```javascript
req.body['car[make]']
```

It would be a bit easier if we could use the data like:

```javascript
req.body.car.make
```

For this we will use `body-parser`.

## Configure your app to use body-parser

First add the package to your `package.json` dependencies, ``npm install --save body-parser``

When we want to use the body-parser middleware we need to do two things:
1. Include the body-parser module, ``require('body-parser')``
2. Tell the application we want to use the body-parser middleware ``app.use(bodyParser.json())``

Body-parser includes a number of ways that body can parsed. The two most common are ``bodyParser.json()`` for parsing JSON from 
AJAX calls and ``bodyParser.urlencoded({ extended: false })`` for parsing data from HTML forms. You can use two ``app.use`` 
statements if you want to parse both JSON and forms.

Once you use body-parser, the params passed with a request will be "decoded" automatically, allowing you to use dot notation when 
working with request bodies.

Now the app will decode all JSON received in the body of a client request.

## Nodemon 
When we start developing Express applications, there is a similar cycle to developing browser apps. You make a change and then need 
to restart the app. One way to make your development cycle run faster is to use nodemon. This package automatically restarts your 
Node app when you save a file so you don't have to.

To use nodemon you need to first install it, ``npm install --save-dev nodemon``. This


## Independent Practice

In the new file, try to create the 7 Restful Routes for the resource "car". Every method should return some text saying the HTTP Verb, which URI has been used to do the request and which REST action it corresponds to.

Example, for a POST request to `/cars` the text sent back should be:

```
POST request to /cars, this is the CREATE action
```

## Pratical Use

You'll use Node modules in every Node or Express app you'll make. Splitting up your code into multiple files helps to organize your 
code and package your code for use by other developers.

Pulling the routing info into another file is common practice. This can be the start of the Model-View-Control(MVC). 

body-parser is also the first example of the most common Express pattern of creating middle-ware or code that makes an adjustment 
to the request and then passes that adjusted request to the rest of the app to use.

## Conclusion
A framework can be overwhelming at the start, after a couple of days you will see how it makes your life easier.  We will work more on how to make RESTful controllers, this is just an introduction.

- What is Middleware and why is it helpful in Express?
- Explain how body-parser helps decode information in your application.
- Identify some similarities and differences between Express and Sinatra.
