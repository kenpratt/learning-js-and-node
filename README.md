# Overview

1. Plain JavaScript, trying out exercises and mini projects
2. Node.js basics, simple input/output, file reading/writing
3. HTML, CSS, basic jQuery, chrome dev tools
4. Making a simple client/server app with HTML + CSS + jQuery on front-end, Node.js on back-end. Get solid understanding of HTTP (I'll help a bunch here), JSON, more chrome dev tools.
5. Quick detour into websockets (revise previous app to use websockets).
7. Knockout.js -- learn basics, then iterate on sample app with Knockout.js
8. CoffeeScript -- by this time, should see the advantages and have a good enough mental model of JS to get it right away
9. Git! (and maybe more terminal tools)

# Todo List

This currently covers steps 2 to 5. Probably we'll do the rest in it too.

## Todo List, Phase 1

**Objective:** Make a simple to-do list that you can use to keep track of all the things that need doing!

**Requirements:**
* Should be able to add a todo item to the list
* Should be able to mark a todo item as done
* Should be able to "undo" a todo item
* Should be able to delete a todo item
* Should be able to view the whole list
* The list should be sorted with the newest stuff on top, oldest at the bottom, but in two sections: not done first, and then done second (so oldest not done item is just above newest done item)

**Technical hints:**
* JavaScript Reference (for now, just the top "Objects" section): http://w3schools.com/jsref/
* Node.js Manual: http://nodejs.org/api/
* For the first pass, it can all be in one file with testing code inline.
* You'll need a way to reference a todo item. You could either create IDs for them when you create each item, or reference by the position in the list. (IDs is the usual approach)
* After that, create a "module" with the todo list in it, that you can load from a test file, or load up in the Node.js REPL (aka console) and muck around with.
* Have a sensible "API" to the module, to allow users to do all of the operations above easily.

**Bonus:**
* Scanning through the todo list to find a certain todo to mark complete or not can be pretty ineffecient. Write a test script that inserts 100,000 todo items into the list, and then goes through the whole list marking everything as done. Use the "time" command to see how long it takes to run. Then, add a lookup table to your todo list code that can look up a todo given its id (hint: use a JS object), and modify the functions that take in a todo item id and do something to it to use your new lookup function. Now, time your test script again and see how much of an improvement was made.


## Todo List, Phase 2

Oh no, my to-dos keep getting deleted every time we run the program! That's not very useful :(

**Objective:** Enhance to-do list to actually save the items between runs of the program.

**Requirements:**
* Should be able to start and stop the program as much as you want, with the items saved.

**Technical hints:**
* You'll want to save the todo list to a file whenever anything changes, and load the contents of the file when the program loads up (you'll need to use `fs.readFile` and `fs.writeFile` -- don't forget to require "fs" http://nodejs.org/api/fs.html).
* You can "serialize" the todo list to JSON format when saving, and the "deserialize" it when loading the file (you'll need to use `JSON.stringify` and `JSON.parse`).


## Intermission

If you'd like more practice before continuing, try out these two problems:

1. Implement a stopwatch program that has the following features:
   * Starts at time = 0ms
   * Can be started, paused, and reset. Each operation prints out the accumulated time in milliseconds when executed.
   * Pause/resume should keep the current time in milliseconds intact.
   * While running, prints out "mark!" every 5 seconds (0s, 5s, 10s, 15s).
   * You'll need to use `var tref = setTimeout(myFunction, millisecondsToWait);` and `clearTimeout(tref)`.

2. [Music player problem](https://github.com/kenpratt/learning-js-and-node/blob/master/music_player.md) ([sample output](https://github.com/kenpratt/learning-js-and-node/blob/master/music_player_sample_output.txt)). You'll need to use `setTimeout` and `clearTimeout`, as well as `Math.random()` if you choose to implement shuffle mode. Try to think of as many "corner cases" as you can and test them to see if they work.


## Reading time!

Start going through "The Node Beginner Book" as you work through "Todo List, Phase 3". You don't have to finish the whole thing before, just start it, and then start the problem, and read as far as makes sense.


## Todo List, Phase 3

But I want to access my to-do list from on the go? Not this silly REPL?

**Objective:** Make to-do list accessible over an HTTP JSON API.

**Requirements:**
* Should be able to access HTTP endpoints to do operations on the todo list.

```
GET /todos (list todo items)
  Params: (none)
  Result: 200 OK, return list of todo items, in JSON format, with Content-Type header set to application/json
  Try it: $ curl http://localhost:8000/todos

POST /todos (create a new todo item)
  Params: text => todo text
  Result: 200 OK, blank
  Try it: $ curl -X POST -d "text=Hello" http://localhost:8000/todos

POST /todos/complete (mark a todo item as done)
  Params: id => todo id
  Result: 200 OK, blank
  Try it: $ curl -X POST -d "id=2" http://localhost:8000/todos/complete

POST /todos/uncomplete (mark a todo item as not done)
  Params: id => todo id
  Result: 200 OK, blank
  Try it: $ curl -X POST -d "id=2" http://localhost:8000/todos/uncomplete

POST /todos/delete (delete a todo item)
  Params: id => todo id
  Result: 200 OK, blank
  Try it: $ curl -X POST -d "id=2" http://localhost:8000/todos/delete
```

**Technical hints:**
* Start with making a simple Node.js HTTP server that returns "dummy" data.
* Then, after you have the HTTP server working, hook it up to your existing Todo List module (the server and todo list should be separate, so you can still access TODOs from the REPL as well).
* Curl is a useful tool for testing out your new API.


## Client side time!

Okay, now you know enough to be dangerous on the server side. But that's only half of the equation. Most users don't want to use "curl" or weird command-line REPLs. They like buttons to click on!

So go through the CodeAcademy Web track: http://www.codecademy.com/tracks/web. Try out some HTML and CSS. No jQuery or other client-side JavaScript needed yet.


## Todo List, Phase 4

*Important:* Make a copy of your todo list from Phase 3, as you'll need it later for Phase 6. Phase 4 is kind of on off-shoot (you'll see what I mean).

**Objective:** Create a todo list website! Your

**Requirements:**
* Should have a list of todo items
* Should have a text box & button to add a new todo
* Should have a button next to each incomplete todo item to mark that items as complete ("done")
* Should have a button next to each complete todo item to mark that items as incomplete ("not done")
* Should have a button next to each todo item to delete that item
* The list should be sorted with the newest stuff on top, oldest at the bottom, but in two sections: not done first, and then done second (so oldest not done item is just above newest done item)
* The done items should be crossed out and lighter grey

**Technical hints:**
* Re-use the same server as Phase 3.
* To start, try making an HTML page that has a text box and a button inside a form, that sends a `POST /todos` request to your server, which will create the todo item. It should work without any changes to your server code.
* After you have that working, move the HTML page into the server so that when you visit http://localhost:8000/todos, you see that page (you'll need to replace your `GET /todos` code to return that HTML, and change the content-type to `text/html`.
* Now that you have your web server serving up an HTML page, have it dynamically generate that page with a a list of todo items in it. You'll probably want to use [embedded JavaScript templates](https://github.com/visionmedia/ejs), as it'll be easier than building an HTML string by hand. But feel free to build an HTML string by hand if you find that simpler. If want help setting this up, just ask/grab me.
* Not try to add the other functionality, which should hit the other POST URLs.
* For the POST requests, send a 302 with the `Location` header set to `/todos`. This will cause the browser to do a send a `GET /todos` request and render the page.

You should now have a fully-functioning todo-list, that has a fancy UI and saves the items to a file on the server. Congratulations, you've just created your first full web application, that you could post online for the whole wide world to use!

If you haven't done so already, spruce up the page a bit with some CSS to make it look presentable.


## Todo List, Phase 5

Yay, we've made a manual web server! But could it really always be that hard to serve stuff up??

**Objective:** Re-write the server side of Phase 4 using the Express library, to trim down the code. Express is a "web application framework" that makes it much simpler to write web servers than using the Node.js HTTP Server API.

**Requirements:**
* Should be almost the same as Phase 4, but use Express.js for the routing, POST data parsing, redirecting, and static file serving.
* One minor change: To clean up the POST requests, change the forms with hidden fields for the IDs to put the ID in the url instead. It is very common in web APIs to use the id as part of the URL -- it makes things simpler to understand and in some cases, simpler to implement, than using hidden form parameters.

```
POST /todos/37/complete (mark a todo item as done)
  Params: none
  Result: 200 OK, blank
  Try it: $ curl -X POST -d "id=2" http://localhost:8000/todos/37/complete

POST /todos/37/uncomplete (mark a todo item as not done)
  Params: none
  Result: 200 OK, blank
  Try it: $ curl -X POST -d "id=2" http://localhost:8000/todos/37/uncomplete

POST /todos/37/delete (delete a todo item)
  Params: none
  Result: 200 OK, blank
  Try it: $ curl -X POST -d "id=2" http://localhost:8000/todos/37/delete
```

**Technical hints:**
* Use your todos.js from Phase 4, but start from scratch on the web server. To get started, `npm install express`, and try out https://github.com/visionmedia/express/blob/master/examples/hello-world/index.js, replacing `require('../../')` with `require('express')`.
* For GET requests, you can use `app.get('/', function(req, res) { res.send('Hello World'); });`. (http://expressjs.com/api.html#app.VERB)
* For POST requests, you can use `app.post('/', function(req, res) { res.send(""); });`. (http://expressjs.com/api.html#app.VERB)
* To get the POST parameters, you can add `app.use(express.bodyParser());` and then they will be available as an object in `req.body`. (http://expressjs.com/api.html#req.body)
* To send a redirect, you can use `res.redirect('/foo/bar');`. (http://expressjs.com/api.html#res.redirect)
* To serve up `stylesheet.css` or any other "static" files, you can use `app.use(express.static('public'))`. You'll need to move any files you want served into a sub-directory. (http://expressjs.com/api.html#directory)

Alright, now compare your code to Phase 4. It should be much shorter and more understandable. Libraries often exist to help out with things you want to do, so you don't have to create quite so much from scratch. If only I'd told you about this one in the first place ;)


## We want rich clients!

Okay, so now you have an "old school" web application where there isn't any JavaScript on the client side, and the server is generating all the pages. This is how most of the web works (Wikipdeia, blogs, news sites, Rails applications like Leanpub, etc). However, we want to build a fancy "rich client" application, like Gmail, so we'll be doing things a bit differently. Instead of reloading the page every time the user clicks a button, we'll use JavaScript to update the page. This will make the app feel much faster and fancier. However, we'll need to know a bit of jQuery first (technically, you don't need jQuery to do it, but it makes it about a hundred times easier than writing plain JavaScript for browsers).

Now do the jQuery track: http://www.codecademy.com/tracks/jquery

And then some of the projects if you feel like it: http://www.codecademy.com/tracks/projects


## Todo List, Phase 6

**Objective:** Create an HTML app to-do list that can do the same sort of stuff as our previous todo list, but building and updating the page dynamically on the client instead of on the server.

**Requirements:**
* Should have a list of todo items
* Should have a text box & button to add a new todo
* Should be able to check a check box to mark a todo item as done
* Should be able to uncheck a check box to mank a todo item as not-done
* Should be able to delete a todo item by clicking on an [X] next to it, or a button or something
* The list should be sorted with the newest stuff on top, oldest at the bottom, but in two sections: not done first, and then done second (so oldest not done item is just above newest done item)
* The done items should be crossed out and lighter grey

**Technical hints:**
* Start with the HTML and CSS from Phase 5. You won't need a server for this phase.
* Add jQuery functions so that whenever a button is clicked, the HTML is updated as needed. Adding a new todo item should append it to the list of uncompleted todos, completing a todo should move it to the end of the completed list, uncompleting should move it to the end of the uncompleted list, and deleting should remove it.
* http://w3schools.com/tags/, http://w3schools.com/cssref/, http://w3schools.com/jsref/, and http://docs.jquery.com/ are your friends.
* The Chrome developer tools are awesome. Look up some tutorials on using them, or grab me and I can show you the ropes.

Okay, so now we have a fancy-dancy UI. But we lost the whole server interaction part, which was kind of the whole point!!


## Todo List, Phase 7

Now it's time to hook your fancy new client UI up to your Node.js todo list HTTP server!

**Objective:** Combine "Todo List, Phase 3", "Todo List, Phase 5", and "Todo List, Phase 6" to have the HTTP server storing the TODO items for you. Use Express, like in Phase 5, but have it return JSON instead of HTML, like in Phase 3.

**Requirements:**
* Should be able to add, complete, uncomplete, and delete todo items and have the changes updated the server.
* Should be able to reload the browser and still have the todo items show up.
* Should be able to restart the server, then reload the browser, and have the todo items show up (due to file-based persistence on the server).

**Technical hints:**
* You'll need to use some of the jQuery "AJAX" functions: http://api.jquery.com/category/ajax/
* Take a look at the network tab in Chrome dev tools to see what's going on.


## Todo List, Phase 8

Buuut what I really want is a multi-user todo list! And I want it to be speedy!

The problem with HTTP is that the client is in the driver seat, and the server can't do anything unless the client asks it to. But sometimes, you really really want to tell something to the client without it asking. Like for example, if you're looking right at your shopping list and I just bought milk, and I want to deleted the "Buy Milk" todo item and have it update on your screen post-haste. The easiest way to solve this is by "polling", aka having the client ask the server every few seconds if there has been any updates. But it's chatty and a total pain. The preferred solution these days is to use "web sockets", which are basically just a TCP socket, and don't use much of HTTP. They give you a connection between the client and the server where messages can be sent in either direction, and don't even necessarily need to be in request/response pairs.

**Objective:** Switch from an HTTP API to using websockets, and let a bunch of people work on the same todo list at the same time.

**Requirements:**
* Should be able to have multiple browser tabs doing stuff in the todo list and changes showing up in all the tabs simultaneously.

**Technical hints:**
* Keep your client code from Phase 7 and your todos.js from Phase 7, but throw out the web server code and start from scratch.
* Create a new server that uses web sockets. Start with https://github.com/kenpratt/learning-js-and-node/blob/master/example_web_socket_server/.
* Take a look at the network tab in Chrome dev tools to see what's going on.
* You'll probably want to have all your messages be objects with `type` set to something. For example `{type: "todos", todos: [...]}`, or `{type: "complete_todo", id: 37}`.
* When a client connects, send the list of todos in a JSON message from the server to the client.
* When a todo is added, completed, uncompleted, or removed, send a message from the client to the server.
* Whenever a todo changes on the server, send a message to all connected clients with the updated information for that todo (or whether it's been deleted). Clients should update their interface as needed.


## Time for some fun!

**Objective:** Create a multi-player Chess game.

**Requirements:**
* Players should be able to join the game by visiting a URL, setting their name in the browser "query string": http://localhost:3000/chess?name=Ken
* Once two players have joined, black/white is randomly assigned and the game begins.
* Regular chess movement rules apply (castles optional).
* Moves are broadcast to other player in real time.
* (Optional) Server stores either list of moves or board state, so if a player refreshes their browser, they can keep playing.
* (Optional) Support for more than one game going on at the same time.

**Technical hints:**
* Use everything you've learned so far, including websockets to talk to the server, HTML & CSS to show the board and pieces, and jQuery to handle clicking around on the


## Todo List, Phase 9

Knockout.js


## Todo List, Phase 10

CoffeeScript
