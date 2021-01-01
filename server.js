const express = require("express");
const fs = require("fs");
const path = require("path");
const {nanoid} = require("nanoid")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get("/api/notes", function(req, res) {

    // Use the fs module to read the `db.json` file and parse it
    let noteContent = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"))

    // THEN send the parsed data back to the client with res.json()    
    return res.json(noteContent);
});

app.post("/api/notes", function(req, res) {

    // Access the posted data in `req.body`
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        // Assign an id to the note
        id: nanoid(),
    };
    
    // Use the fs module to read the `db.json` file and parse response
    let noteContent = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));
    
    // Push the `req.body` to the array list
    noteContent.push(newNote);    

    // JSON.stringify() the array list back into a JSON string
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(noteContent));
    
    // THEN save the contents back to the `db.json` file with the fs module
    res.json(noteContent);

});


// app.delete("/api/notes/:id", function(req, res) {

//     // Access the :id from `req.params.id`
    
//     // Use the fs module to read the `db.json` file

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