const express = require("express");
const app = express();
const db = require("./db/db.json");
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;


// parse json request body
app.use(express.urlencoded({ extended: true }));
// parse urlencoded request body
app.use(express.json());

app.use(express.static(__dirname + '/public'));

//API routes

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        return res.json(JSON.parse(data))
    })

});

app.post('/api/notes', (req, res) => {
    let newNote = req.body
    //get npm package for id
    newNote.id = uuidv4();
 
    db.push(newNote)
 
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err
 
        res.json(db)
    })
 });

 app.delete('/api/notes/:id', (req, res) => {
    let idToBeDeleted = req.params.id
    
    for(i=0;i<db.length;i++){
        if(idToBeDeleted == db[i].id){
            db.splice(i, 1)
        }
    }

    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err
 
        res.json(db)
    })
});

//HTML routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})