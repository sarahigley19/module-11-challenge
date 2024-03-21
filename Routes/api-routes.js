const router = require('express').Router();
const { createNewNote, updateDb } = require("../lib/notes");
const { v4: uuidv4 } = require('uuid');
const notesDatabse = require("../db/db.json");
const fs = require("fs");

// show all notes in json data
router.get("/notes", (req, res) => {
	fs.readFile("./db/db.json", (err, data) => {
		if (err) {
			throw err
		}
		let noteData = JSON.parse(data)
		res.json(noteData);
	}) 
});

router.post("/notes", (req, res) => {
	const { title, text } = req.body
	const newNote = {
		title, 
		text,
		id: uuidv4()
	}
	notesDatabse.push(newNote)
	fs.writeFile("./db/db.json", JSON.stringify(notesDatabse), (err) => {
		if (err) {
			console.error(err)
		}
		console.log("Note Saved!")
		res.json(newNote);
	})
});

router.delete("/notes/:id", (req, res) => {
	const params = req.params.id
	updateDb(params, notes);
	res.redirect('');
});

module.exports = router;