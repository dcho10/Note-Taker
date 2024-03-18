const notes = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

notes.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

notes.post("/api/notes", (req, res) => {
    console.info(`${req.method} request recevied to submit note`);
    const data = fs.readFileSync("./db/db.json");
    const notesData = JSON.parse(data);
    res.json(notesData); 

    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        notesId: uuid(),
    };

    notesData.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
    res.json(notesData);
});

module.exports = notes;