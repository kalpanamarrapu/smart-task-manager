function toggleInput() {
    const area = document.getElementById("inputArea");
    area.style.display = area.style.display === "flex" ? "none" : "flex";
}

function addTask() {
    const text = document.getElementById("taskText").value;
    const time = document.getElementById("taskTime").value;

    if (!text) return;

    fetch('/add_task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, time: time })
    }).then(() => {
        loadTasks();
        document.getElementById("taskText").value = '';
        document.getElementById("taskTime").value = '';
    });
}

function deleteTask(index) {
    fetch('/delete_task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: index })
    }).then(() => loadTasks());
}

function loadTasks() {
    fetch('/get_tasks')
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("taskList");
        list.innerHTML = '';

        data.forEach((task, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <div class="task-info">
                    <span>${task.text}</span>
                    <span class="time">⏰ ${task.time || "No time"}</span>
                </div>
                <button class="delete" onclick="deleteTask(${index})">Done</button>
            `;

            list.appendChild(li);
        });
    });
}

window.onload = loadTasks;