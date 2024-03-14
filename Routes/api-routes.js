const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

module.exports = (app) => {

  //Route to Note
  app.post('/api/notes', (req, res) => {
    try {
      
	//Read note
      const db = JSON.parse(fs.readFileSync('db/db.json'));

      //Create note
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid(),
      };

      //Push note to database
      db.push(newNote);

      //Write to db file
      fs.writeFileSync('db/db.json', JSON.stringify(db));

      //Send response
      res.json(db);
    } catch (error) {
      console.error('Error adding new note:', error);
      res.status(500).json({ error: 'Failed to add new note' });
    }
  });

  //Route to delete
  app.delete('/api/notes/:id', (req, res) => {
	try {
		
	const db = JSON.parse(fs.readFileSync('db/db.json'));
		  
    const updatedNotes = db.filter((note) => note.id !== req.params.id);

	fs.writeFileSync('db/db.json', JSON.stringify(updatedNotes));
		
    res.json(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Failed to delete note' });
    }
  });
};
