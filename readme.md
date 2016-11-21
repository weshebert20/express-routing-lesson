# Modular Express

<!--11:00 5 minutes -->
<!-- Hook: Iono -->

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

## Recapping Node and Intro to Express - Intro (5 mins)

#### First let's review

* What is Node?

Node is a low-level, non-blocking, event-driven platform which allows you to write JavaScript on the server-side.

* What is npm?

npm is Node's package manager. It's used to manage dependencies. Think of it as a better way to include files in your HTML head.

* What is express.js?

Express.js is a simple web framework for Node.js. It provides many features for you to start using right away (Routing, Sessions) that you would have to do yourself if using vanilla Node.

* What is a route?

A route is a combination of a path (e.g. `/about`) and HTTP verb (e.g. `GET`) that allows a server to direct (route) a certain request to a certain response.

## Adding Routes to our app 
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

This app works but as we keep adding more endpoints, we'll end up creating more routes.  This can get messy pretty quickly.

## Creating a controllers module 
<!-- 11:15 20 minutes -->
<!-- Catch-up -->

Lets create a module for our controllers and related routes. First we'll take our routes from the app we started with. 

Here are the steps to refactor our routes to a new file:

1. Create the new file
2. Move the routes(.get, .post, etc) to the new file
3. If all the routes share a portion of the endpoint path, e.g. (cars, tacos, candies), remove that path name but remember it
4. Use the Router constructor
5. Export the router
6. Require the router from the file that runs the main app
7. `app.use` the router with the path prefix you removed in step 3

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
Inside of our main ``app.js`` we need to make sure our app uses the router. This is done by using ``app.use('\api', myRouter)``.

## Restful Routing - Intro
<!-- 11:35 10 minutes -->

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

### Independent Practice

<!--11:45 25 minutes -->

In the new file, try to create the 7 Restful Routes for the resource "car". Every method should return some text saying the HTTP Verb, which URI has been used to do the request and which REST action it corresponds to.

Example, for a POST request to `/cars` the text sent back should be:

```
POST request to /cars, this is the CREATE action
```

#### Bonus

Once you get all 7 routes printing their path and method, see if you can return JSON for a couple cars with the Index route.

## Query Params
<!-- 12:10 5 minutes --> 

Generally, you don't want to cram everything into a route. If we want to pass specific variables in a route, we can use **query parameters** with each request.

Let's see query params in action. Go to [https://google.com/search?q=kittens&tbm=isch](https://google.com/search?q=kittens&tbm=isch)

* `?` denotes the beginning of the query parameters
* `=` indicates an assignment; anything to the left is the key, while the right represents the value
* `&` allows for the input of multiple parameters, separating each

## BodyParser and handling params/JSON
<!-- 12:15 10 minutes -->

When data is sent to the server via a POST request (from a form, for example), the content of the request is passed as a string, but we want to access it as if it was a JavaScript object:

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

Body-parser includes a number of ways that body can parsed. The two most common are ``bodyParser.json()`` for parsing JSON from AJAX calls and ``bodyParser.urlencoded({ extended: false })`` for parsing data from HTML forms. You can use both with ``app.use`` statements.

Once you use body-parser, the params passed with a request will be "decoded" automatically, allowing you to use dot notation just as you would with a JS object.

## Nodemon

When we start developing Express applications, there is a similar cycle to developing browser apps. You make a change and then need to restart the app. One way to make your development cycle run faster is to use nodemon. This package automatically restarts your Node app when you save a file so you don't have to.

To use nodemon you need to first install it, ``npm install -g nodemon``. This will install a global nodemon, so you can use it in any project.

## Conclusion

<!--12:25 5 minutes -->

A framework can be overwhelming at the start, but after a couple of days you will see how it makes your life easier.  We will work more on how to make RESTful controllers, this is just an introduction.

- What is Middleware and why is it helpful in Express?
- Explain how body-parser helps decode information in your application.
- Identify some similarities and differences between Express and Sinatra.

## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
