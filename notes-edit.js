const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#remove-note");
const noteId = location.hash.substring(1);
const dateElement = document.querySelector("#last-edited");

let notes = getSavedNotes();
let note = notes.find(note => note.id === noteId);

if (!note) {
  location.assign("/index.html");
}

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

//1. Setup input event for title
titleElement.addEventListener("input", e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  savedNotes(notes);
});

//3. Repeat steps 1-2 for body
bodyElement.addEventListener("input", e => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  savedNotes(notes);
});
//4. Setup a remove button that remotes notes and sends uses back to home page

removeElement.addEventListener("click", e => {
  removeNote(note.id);
  savedNotes(notes);
  location.assign("/index.html");
});

window.addEventListener("storage", e => {
  if (e.key === notes) {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => note.id === noteId);

    if (!note) {
      location.assign("/index.html");
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});

// 1. Add a DOM element between the title and body inputs
// 2. Set up text value: Last edited 4 hours ago
// 3. Update value on title/body/storage change
