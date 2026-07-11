import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/notes';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error('Error fetching notes:', err));
  }, []);

  function handleAddNote() {
    const trimmedText = newNoteText.trim();
    if (trimmedText === '') return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmedText }),
    })
      .then((res) => res.json())
      .then((savedNote) => {
        setNotes([...notes, savedNote]);
        setNewNoteText('');
      })
      .catch((err) => console.error('Error adding note:', err));
  }

  function handleDeleteNote(id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((err) => console.error('Error deleting note:', err));
  }

  return (
    <section className="notes">
      <h2>Notes</h2>

      <div className="add-note">
        <input
          type="text"
          placeholder="Add a new note..."
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
        />
        <button onClick={handleAddNote}>Add</button>
      </div>

      <div className="notes-container">
        {notes.map((note) => (
          <div key={note._id} className="note">
            <p>{note.text}</p>
            <button
              className="delete-btn"
              onClick={() => handleDeleteNote(note._id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NotesList;