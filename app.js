const buttonEl = document.getElementById('btn')
const appEl = document.getElementById('app')

// function to create text area for note--------------------
function createNodeEl(id, content){
    const element = document.createElement('textarea')
    element.cols = 30;
    element.rows = 10;
    element.classList.add('note')
    element.placeholder = 'Enter notes...'
    element.addEventListener('dblclick', ()=>{
        if(confirm('do you want to delete?')){
            deleteNote(id, element)
        }
    })
    element.addEventListener('input', ()=>{
        updateNote(id, element.value)
    })
    return element
}

// delete note-----------------------------------------------
function deleteNote(id, element) {
    const notes = loadNotes()
    const target = notes.filter(note => note.id != id)
    saveNotes(target)
    appEl.removeChild(element)
}
// update notes text data------------------------------------
function updateNote(id, content){
    const notes = loadNotes()
    const target = notes.filter(note => note.id == id)[0]
    target.content = content
    saveNotes(notes)

}

// Master function for button--------------------------------
function addNote(){
    const notes = loadNotes()
    const noteObj = {
        id: Math.floor(Math.random()*10000),
        content: ''
    }
    const noteEl = createNodeEl(noteObj.id, noteObj.content)
    appEl.insertBefore(noteEl, buttonEl)

    notes.push(noteObj)
    saveNotes(notes)

}

// Saving and loading data from local storage----------------
function saveNotes(notes){
    localStorage.setItem('note-app', JSON.stringify(notes))
}
function loadNotes(){
    return JSON.parse(localStorage.getItem('note-app') || '[]')
}

// Load data from local storage when page refreshes for the first time
loadNotes().forEach(note => {
    const noteEl = createNodeEl(note.id, note.content)
    appEl.insertBefore(noteEl, buttonEl)
});

// Button to add new notes-----------------------------------
buttonEl.addEventListener('click', addNote)

