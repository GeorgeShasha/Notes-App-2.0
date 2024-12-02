const addBtn = document.getElementById("add");
const containerElement = document.getElementById("container");

const createNoteElement = (id, content) => {
  const element = document.createElement("textarea");
  element.placeholder = "Type a note...";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Are you sure you want to delete this note?");

    if (warning) {
      deleteNote(id, element);
    } else {
      element.value = content;
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
};

const addNote = () => {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNoteElement(noteObj.id, noteObj.content);
  containerElement.insertBefore(noteElement, addBtn);

  notes.push(noteObj);

  saveNoteLocalStorage(notes);
};

const deleteNote = (id, element) => {
  const notes = getNotes().filter((note) => note.id != id);
  saveNoteLocalStorage(notes);
  containerElement.removeChild(element);
};
const updateNote = (id, content) => {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];
  targetNote.content = content;
  saveNoteLocalStorage(notes);
};

const saveNoteLocalStorage = (notes) => {
  localStorage.setItem("note-app", JSON.stringify(notes));
};

const getNotes = () => {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
};

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  containerElement.insertBefore(noteElement, addBtn);
});

addBtn.addEventListener("click", addNote);
