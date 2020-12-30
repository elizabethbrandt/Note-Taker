const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get("/api/notes", function(req, res) {

    // Use the fs module to read the `db.json` file and parse it
    const noteContent = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));

    // THEN send the parsed data back to the client with res.json()
    res.json(noteContent);

})

// app.post("/api/notes", function(req, res) {

//     // Access the posted data in `req.body`
    
//     // Use the fs module to read the `db.json` file
//     fs.readFile("./db/db.json", "utf8")
    
//     // THEN parse the file contents with JSON.parse to get the real data
    
//     // Push the `req.body` to the array list

//     // JSON.stringify() the array list back into a JSON string

//     // THEN save the contents back to the `db.json` file with the fs module

// })

// app.delete("/api/notes/:id", function(req, res) {

//     // Access the :id from `req.params.id`
    
//     // Use the fs module to read the `db.json` file
//     fs.readFile("./db/db.json", "utf8")

//     // THEN parse the file contents with JSON.parse to get the real data

//     // OPTION A
//         // Find the matching index using .findIndex() method
//         // Remove the target element using the .splice() method

//     // OPTION B
//         // Use the array.filter() method to filter out the matching element
//         // myArray = myArray.filter(element => element.id !== req.params.id);

//     // Return any type of success message

// })

app.get("/notes", function(req, res) {
    
    // return the contents of the notes.html
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    
});

app.get("*", function(req, res) {

    //return the contents of the index.html
    res.sendFile(path.join(__dirname, "/public/index.html"));

});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });