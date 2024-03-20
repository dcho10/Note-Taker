// Set up requires
const notes = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Created helper function to read db.json file
const readNotesFromFile = () => {
    // Used try statement to read db.json but if there is nothing in the folder (i.e. no saved notes), it will catch and return an empty array
    try {
        const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Created helper function to write to db.json
const writeNotesToFile = (notes) => {
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), "utf8");
};

// GET method to retrieve notes
notes.get("/", (req, res) => {
    const notes = readNotesFromFile();
    res.json(notes);
});

// POST method to save notes
notes.post("/", (req, res) => {
    const newNote = req.body;

    // Generate uuid from npm uuid
    newNote.id = uuidv4();
    let notes = readNotesFromFile();

    // Check to see if notes is an array, if it is not an array, it will generate an empty array
    if (!Array.isArray(notes)) {
        notes = [];
    }

    // Use array push method to add newNote into notes array
    notes.push(newNote);

    // Write notes to db.json and create the object for newNote
    writeNotesToFile(notes);
    res.json(newNote);
});

// DELETE method to delete based on uuid
notes.delete("/:id", (req, res) => {

    // req.params.id is the id for a note to be deleted
    const noteId = req.params.id;
    let notes = readNotesFromFile();

    // Use filter method to delete note
    notes = notes.filter(note => note.id !== noteId);
    writeNotesToFile(notes);
    res.sendStatus(204);
});

module.exports = notes;