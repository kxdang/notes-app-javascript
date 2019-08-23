"use stricts";

let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited"
};

renderNotes(notes, filters);

document.querySelector("#create-notes").addEventListener("click", e => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp
  });
  savedNotes(notes);
  location.assign(`/edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", e => {
  filters.sortBy = e.target.value;
  console.log(e.target.value);
  renderNotes(notes, filters);
});

document.addEventListener("storage", e => {
  if (e.key === "notes") {
    // 1. Parse the new data and update
    notes = JSON.parse(e.newValue);
    // 2. Rerender the notes
    renderNotes(notes, filters);
  }
});
