"use strict";

// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

//Remove a note from the list
const removeNote = id => {
  const noteIndex = notes.findIndex(note => note.id === id);

  //If there is a match location.assign("/edit.html"); it will return a positive integer
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1); //splice it
  }
};

//Generate the DOM structure for a note
const generateNoteDOM = note => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  //set up the ;oml
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");
  //Set up the status method
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

//Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlphabet") {
    return notes.sort((a, b) => {
      if (a.title.charAt(0).toLowerCase() < b.title.charAt(0).toLowerCase()) {
        return -1;
      } else if (
        a.title.charAt(0).toLowerCase() > b.title.charAt(0).toLowerCase()
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  }
};

//Render application notes
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector("#notes");
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(note => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

// Save the notes to local storage

const savedNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

//Generate the last edited message
const generateLastEdited = timestamp => {
  return `Last edited ${moment(timestamp).fromNow()}`;
};
