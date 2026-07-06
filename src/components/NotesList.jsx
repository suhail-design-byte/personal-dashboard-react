import { useState } from 'react';

function NotesList() {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Remember to check solar panel voltage readings today.' },
    { id: 2, text: 'Ask about MongoDB free tier limits before deploying.' },
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  function handleAddNote() {
    const trimmedText = newNoteText.trim();
    if (trimmedText === '') return;

    const newNote = {
      id: Date.now(),
      text: trimmedText,
    };

    setNotes([...notes, newNote]);
    setNewNoteText('');
  }

  function handleDeleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
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
          <div key={note.id} className="note">
            <p>{note.text}</p>
            <button
              className="delete-btn"
              onClick={() => handleDeleteNote(note.id)}
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