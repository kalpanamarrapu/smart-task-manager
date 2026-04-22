function addNote() {
    const text = document.getElementById("noteInput").value;

    if (!text) return;

    fetch('/add_note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
    }).then(() => {
        loadNotes();
        document.getElementById("noteInput").value = '';
    });
}

function deleteNote(index) {
    fetch('/delete_note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: index })
    }).then(() => loadNotes());
}

function loadNotes() {
    fetch('/get_notes')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("notesList");
        container.innerHTML = '';

        data.forEach((note, index) => {
            const div = document.createElement("div");
            div.className = "note";

            div.innerHTML = `
                ${note.text}
                <button class="delete-btn" onclick="deleteNote(${index})">X</button>
            `;

            container.appendChild(div);
        });
    });
}

window.onload = loadNotes;