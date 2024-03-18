const notes = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uuid = uuidv4();

const dbFilePath = path.resolve(__dirname, "../db/db.json");

notes.get("/", (req, res) => {
    res.sendFile(dbFilePath);
});

notes.post("/", (req, res) => {
    console.info(`${req.method} request recevied to submit note`);
    const data = fs.readFileSync(dbFilePath);
    const notesData = JSON.parse(data);

    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        notesId: uuid,
    };

    notesData.push(newNote);
    fs.writeFileSync(dbFilePath, JSON.stringify(notesData));
    res.json(notesData);
});

notes.delete("/:id", (req, res) => {
    const data = fs.readFileSync(dbFilePath);
    const deleteNote = data.filter(item => item.id !== req.params.id);
    fs.writeFileSync(dbFilePath, JSON.stringify(deleteNote));
    res.json(deleteNote);
})

module.exports = notes;