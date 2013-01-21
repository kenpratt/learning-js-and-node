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

POST /todos/<id>/complete (mark a todo item as done)
  Params: (none)
  Result: 200 OK, blank
  Try it: $ curl -X POST http://localhost:8000/todos/2/complete

POST /todos/<id>/uncomplete (mark a todo item as not done)
  Params: (none)
  Result: 200 OK, blank
  Try it: $ curl -X POST http://localhost:8000/todos/2/uncomplete

POST /todos/<id>/delete (delete a todo item)
  Params: (none)
  Result: 200 OK, blank
  Try it: $ curl -X POST http://localhost:8000/todos/2/delete
```

**Technical hints:**
* Start with making a simple Node.js HTTP server that returns "dummy" data.
* Then, after you have the HTTP server working, hook it up to your existing Todo List module (the server and todo list should be separate, so you can still access TODOs from the REPL as well).
* Curl is a useful tool for testing out your new API.


## Client side time!

Okay, now you know enough to be dangerous on the server side. But that's only half of the equation. Most users don't want to use "curl" or weird command-line REPLs. They like buttons to click on!

So go through the CodeAcademy Web track: http://www.codecademy.com/tracks/web

And then the jQuery track: http://www.codecademy.com/tracks/jquery

And then some of the projects if you feel like it: http://www.codecademy.com/tracks/projects


## Todo List, Phase 4

**Objective:** Create an HTML app to-do list that can do the same sort of stuff as our previous todo list, but all with UI interaction.

**Requirements:**
* Should have a list of todo items
* Should have a text box & button to add a new todo
* Should be able to check a check box to mark a todo item as done
* Should be able to uncheck a check box to mank a todo item as not-done
* Should be able to delete a todo item by clicking on an [X] next to it, or a button or something
* The list should be sorted with the newest stuff on top, oldest at the bottom, but in two sections: not done first, and then done second (so oldest not done item is just above newest done item)
* The done items should be crossed out and lighter grey

**Technical hints:**
* http://w3schools.com/tags/, http://w3schools.com/cssref/, http://w3schools.com/jsref/, and http://docs.jquery.com/ are your friends.
* The Chrome developer tools are awesome. Look up some tutorials on using them, or grab me and I can show you the ropes.


## Todo List, Phase 5

Now it's time to hook your fancy new client UI up to your Node.js todo list HTTP server!

**Objective:** Combine "Todo List, Phase 3" and "Todo List, Phase 4" to have the HTTP server storing the TODO items for you.

**Requirements:**
* Should be able to add, complete, uncomplete, and delete todo items and have the changes updated the server.
* Should be able to reload the browser and still have the todo items show up.
* Should be able to restart the server, then reload the browser, and have the todo items show up (due to file-based persistence on the server).

**Technical hints:**
* You'll need to use some of the jQuery "AJAX" functions: http://api.jquery.com/category/ajax/
* Take a look at the network tab in Chrome dev tools to see what's going on.


## Todo List, Phase 6

Buuut what I really want is a multi-user todo list! And I want it to be speedy!

**Objective:** Switch from an HTTP API to using websockets, and let a bunch of people work on the same todo list at the same time.

**Requirements:**
* Should be able to have multiple browser tabs doing stuff in the todo list and changes showing up in all the tabs.


## Time for some fun!

**Objective:** Create a two player Chess game, where each player connects from a different computer.

**Requirements:**
* Once two players have joined, black/white is randomly assigned and the game begins.
* Players should be able to set their name in the browser "query string": http://localhost:8000/chess.html?Ken
* Regular chess movement rules apply (castles optional).
* Move is broadcast to other player in real time.
* (Optional) Server stores either list of moves or board state, so if a player refreshes their browser, they can keep playing.
* (Optional) Support for more than one game going on at the same time.

**Technical hints:**
* Use everything you've learned so far, including websockets to talk to the server.
