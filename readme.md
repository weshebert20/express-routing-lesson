# Modular Express

### Objectives
*After this lesson, students will be able to:*

- Use and configure middleware
  - We'll use body-parser to parse form submissions as JSON
- Write out the skeleton of a RESTful API
- Identify the HTTP verbs we'll be using for an API

### Preparation
*Before this lesson, students should already be able to:*

- Explain HTTP requests/responses
- Write and explain basic javascript

## Recapping Node and Intro to Express - Intro (5 mins)

#### First let's review

* What is Node?

Node is a low-level, non-blocking, event-driven platform which allows you to write JavaScript on the server-side.

* What is npm?

npm is Node's package manager. It's used to manage dependencies. Think of it as a better way to include files in your HTML head.

* What is express.js?

Express.js is a simple web framework for Node.js. It provides many features for you to start using right away (Routing, Sessions) that you would have to do yourself if using vanilla Node.

## Adding Routes to our app 
[Time Check]: # (1:05) 

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

## Creating a controllers module 
[Time Check]: # (1:15) 

Lets create a module for our controllersa and related routes. First we'll take our routes from the learnyounode app we started with. 

What are the steps to refactor our routes to a new file:
1. Create the new file
2. Move the routes(.get, .post, etc) to the
3. If all the routes share a portion of the endpoint path, e.g. (cars, tacos, candies), remove that path name but remember it
4. Use the Router constructor
5. Export the router
6. Require the router from the file that runs the main app
7. use the router with any path prefix you removed in step 3

Some more information on some of steps

### Use the Router constructor
Starting in Express 4.0, Express includes the ``express.Router()`` constructor which creates a router, our a mini app, that we 
can use for organization. We can treat this router as a copy of app for creating routes. In particular we can change our ``app.get``
to ``router.get``

```javascript
var router = express.Router()

router.get('/api/parsetime'){
  // my implementation
} 
```

### Export the router
In the ``myRouter.js`` we need to let Node that the router is the important information to return from this module. This is done 
just by using ``module.exports = router``.

### Use the router
Inside of our main ``app.js`` we need to make sure our app uses to the router. This is easy ``app.use('\api', myRouter)``

## Restful Routing - Intro
[Time Check]: # (1:35)

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
## Query Params
[Time Check]: # (1:45) 

Generally, you don't want to cram everything into a route. Just imagine when there are multiple parameters in route. Or maybe we don't
care about getting the order of the parameters correct. Luckily, there are **query parameters** you can include with each request.

Let's see query params in action. Go to [https://google.com/search?q=kittens&tbm=isch](https://google.com/search?q=kittens&tbm=isch)

* `?` denotes the beginning of the query parameters
* `=` indicates an assignment; anything to the left is the key, while the right represents the value
* `&` allows for the input of multiple parameters, separating each

Let's add our first route to practice query params.

``` javascript
route.get("/parsetime", function (req, res) {
  var time = new Date(req.query.iso);
  result = {
    hour: time.getHours(),  
    minute: time.getMinutes(),  
    second: time.getSeconds()  
  }  

  res.send(result);
});
```

Reset your server and go to [localhost:3000/thank?name=jane](localhost:3000/thank?name=jane). Note how we can now define parameters in the url after a `?`.

## BodyParser and handling params/JSON
[Time Check]: # (1:45) 

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

## Pratical Use

You'll use Node modules in every Node or Express app you'll make. Splitting up your code into multiple files helps to organize your 
code and package your code for use by other developers.

Pulling the routing info into another file is common practice. This can be the start of the Model-View-Control(MVC) architecture. 

body-parser is also the first example of the most common Express pattern of creating middle-ware or code that makes an adjustment 
to the request and then passes that adjusted request to the rest of the app to use.

## Extras
### Nodemon
When we start developing Express applications, there is a similar cycle to developing browser apps. You make a change and then need 
to restart the app. One way to make your development cycle run faster is to use nodemon. This package automatically restarts your 
Node app when you save a file so you don't have to.

To use nodemon you need to first install it, ``npm install -g nodemon``. This will install a global nodemon

### Independent Practice

In the new file, try to create the 7 Restful Routes for the resource "car". Every method should return some text saying the HTTP Verb, which URI has been used to do the request and which REST action it corresponds to.

Example, for a POST request to `/cars` the text sent back should be:

```
POST request to /cars, this is the CREATE action
```

## Conclusion
A framework can be overwhelming at the start, after a couple of days you will see how it makes your life easier.  We will work more on how to make RESTful controllers, this is just an introduction.

- What is Middleware and why is it helpful in Express?
- Explain how body-parser helps decode information in your application.
- Identify some similarities and differences between Express and Sinatra.

## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
