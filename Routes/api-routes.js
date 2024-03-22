const router = require('express').Router();
const { createNewNote } = require("../lib/notes");
const { v4: uuidv4 } = require('uuid');
const notesDatabase = require("../db/db.json");
const fs = require("fs");

// show all notes in json data
router.get("/notes", (req, res) => {
	fs.readFile("./db/db.json", (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: "Failed to read notes data." });
		}
		let noteData = JSON.parse(data);
		res.json(noteData);
	})
});

router.post("/notes", (req, res) => {
	const { title, text } = req.body;
	const newNote = {
		title,
		text,
		id: uuidv4()
	};
	notesDatabase.push(newNote);
	fs.writeFile("./db/db.json", JSON.stringify(notesDatabase), (err) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: "Failed to save note." });
		}
		console.log("Note Saved!");
		res.json(newNote);
	});
});

router.delete("/notes/:id", (req, res) => {
	const params = req.params.id;
	const updatedNotes = notesDatabase.filter(note => note.id !== params);
	fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: "Failed to delete note." });
		}
		console.log("Note Deleted!");
		res.json({ success: true });
	});
});

module.exports = router;
