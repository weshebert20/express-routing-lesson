# Modular Express

<!--WDI3 11:16 -->
<!--Started this around 11:20 -->
<!--WDI4 11:35 -->

<!--11:00 5 minutes -->
<!-- Hook: So for the last couple days we have been doing a delicate dance between the front end and the back end.  Raise your hand if you're ready to put that final puzzle piece in place.-->

### Objectives
*After this lesson, students will be able to:*

- **Use** and **configure** middleware
  - We'll use body-parser to parse form submissions as JSON
- **Write** out the skeleton of a RESTful API
- **Identify** the HTTP verbs we'll be using for an API

### Preparation
*Before this lesson, students should already be able to:*

- **Explain** HTTP requests/responses
- **Write** and **explain** basic javascript

## Recapping Node and Intro to Express - Intro

#### First let's review

<!--One dev per question -->

* What is Node?

**Node** is a low-level, non-blocking, event-driven platform which allows you to write JavaScript on the server-side.

* What is npm?

**npm** is Node's package manager. It's used to manage dependencies. Think of it as a better way to include files in your HTML head.

* What is express.js?

**Express.js** is a simple web framework for Node.js. It provides many features for you to start using right away (Routing, Sessions) that you would have to do yourself if using vanilla Node.

* What is a route?

A **route** is a combination of a path (e.g. `/about`) and HTTP verb (e.g. `GET`) that allows a server to direct (route) a certain request to a certain response.

## Adding Routes to our app 
<!--11:40 WDI4 -->
<!-- WDI3 11:20 -->
<!-- 11:05 10 minutes --> 

Let's add some routes. This should all be familiar but let's go through it.

Suppose we have a simple app like the one below:

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
  };

  res.send(result);
});

app.get('/api/unixtime', function(req, res) {
  time = new Date();
  
  res.send({ unixtime : time.getTime() });
});

app.listen(port);
```

[CFU]: # (What does this app do?) 

<!--Once a dev answers the question, go into the folder, npm install, and go to localhost:3000 to test, then turn over to devs -->

This app works but as we keep adding more endpoints, we'll end up creating more routes.  This can get messy pretty quickly.

## Creating a routes module 
<!--11:31 after running through all these steps myself -->
<!-- 11:15 20 minutes -->
<!-- Catch-up -->

Let's create a module for our controllers and related routes. First, we'll take our routes from the app we started with. 

Here are the steps to refactor our routes to a new file:

1. Create the new file
2. Move the routes(.get, .post, etc) to the new file
<!--11:46 WDI4 -->
<!--Good stop point-->
<!--11:49 WDI4 -->
3. Use the Router constructor
4. Export the router
5. Require the router from the file that runs the main app
<!--11:54 WDI4 -->
<!--Good stop point-->
<!--11:57 WDI4 -->
<!--12:02 WDI4 -->
6. If all the routes share a portion of the endpoint path, e.g. (cars, tacos, candies), remove that path name but remember it
7. `app.use` the router with the path prefix you removed in step 3
<!-- WDI4 12:09-->

More information on some of the steps below:

### Use the Router constructor
Starting in Express 4.0, Express includes the ``express.Router()`` constructor which creates a router, a mini app, that we 
can use for organization. We can treat this router as a copy of `app` for creating routes. In particular, we can change our ``app.get`` to ``router.get``

```javascript
var router = express.Router()

router.get('/api/parsetime'){
  // my implementation
} 
```

### Export the router
In the ``myRouter.js`` file, we need to let Node know that we want to return the router from this module, so we can use it in other places. This is done by using ``module.exports = router``.

### Use the router
Inside of our main ``app.js`` we need to make sure our app uses the router. This is done by using ``app.use('/api', myRouter)``.

## Restful Routing - Back End
<!-- 11:35 10 minutes -->

We are going to use the RESTful standard to build our web apps. REST stands for REpresentational State Transfer and is an organizational standard for web architecture designed "to induce performance, scalability, simplicity, modifiability, visibility, portability, and reliability," in the words of its author, Roy Thomas Fielding.

So far, we've covered how to handle GET requests, but we can create callbacks for all types of requests. For example, if we want to create a  RESTful controller for the resource cars, it would look like this:

```javascript

var carRouter = express.Router();

carRouter.get('/', function(req, res) {
  // INDEX
});

carRouter.get('/:id', function(req, res) {
  // SHOW
});

carRouter.get('/new', function(req, res) {
  // NEW - Typically Displays an HTML Form
});

carRouter.post('/', function(req, res) {
  // CREATE
});

carRouter.get('/:id/edit', function(req, res) {
  // EDIT - Typically Displays an HTML Form
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

<!--12:30 actually WDI2-->

<!-- Implement all routes with a res.send saying "This is GET request to /cars, the is the INDEX route" etc. -->

### Independent Practice

<!--WDI4 started at 12:20, came back to finish after lunch -->
<!--11:45 25 minutes -->

Create a new file called `bikeRouter.js`.  Inside that file, create the 7 Restful Routes for the resource "bicycle". Every method should `res.send` some text saying the HTTP Verb, which URI has been used to do the request and which RESTful route it corresponds to.

Example, for a POST request to `/bicycles` the text sent back should be:

```
POST request to /bicycles, this is the CREATE route
```

#### Bonus

Once you get all 7 routes printing their path and method, see if you can return JSON for a couple cars with the Index route.

<!--This should not be here, it should be a mini-intro to the lab, and there NEEDS to be a real application, not just high-fallutin car talk -->

<!--WDI4 1:56 -->
<!--WDI3 12:28 -->
<!--Took 10 minutes to talk about rest below WDI3-->
## BodyParser and handling params/JSON
<!-- 12:15 10 minutes -->

When data is sent to the server via a POST request (from a form, for example), the content of the request is passed [in several pieces](https://stackoverflow.com/questions/34915179/parsing-json-in-express-without-bodyparser), but we want to access it as if it were a JavaScript object.

For this we will use `body-parser`.

## Configure your app to use body-parser

First, add the package to your `package.json` dependencies, ``npm install --save body-parser``

When we want to use the body-parser middleware we need to do two things:

1. Include the body-parser module, ``require('body-parser')``
2. Tell the application we want to use the body-parser middleware ``app.use(bodyParser.json())``

Body-parser includes a number of ways that body can parsed. The two most common are ``bodyParser.json()`` for parsing JSON from AJAX calls and ``bodyParser.urlencoded({ extended: false })`` for parsing data from HTML forms. You can use both with ``app.use`` statements.

Once you use body-parser, the params passed with a request will be "decoded" automatically, allowing you to use dot notation just as you would with a JS object.

## Nodemon

When we start developing Express applications, there is a similar cycle to developing browser apps. You make a change and then need to restart the app. One way to make your development cycle run faster is to use nodemon. This package automatically restarts your Node app when you save a file so you don't have to.

To use nodemon you need to first install it, ``npm install -g nodemon``. This will install a global nodemon, so you can use it in any project.

## Conclusion

<!--WDI4 2:17 then on to HW -->
<!--12:25 5 minutes -->

A framework can be overwhelming at the start, but after a couple of days you will see how it makes your life easier.  We will work more on how to make RESTful controllers, this is just an introduction.

- What is Middleware and why is it helpful in Express?
- Explain how body-parser helps decode information in your application.

## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
