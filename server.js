const express = require("express");
const app = express();
const db = require("./db/db.json");
const fs = require("fs");
const path = require('path');
const PORT = process.env.PORT || 3000;


// parse json request body
app.use(express.urlencoded({ extended: true }));
// parse urlencoded request body
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})