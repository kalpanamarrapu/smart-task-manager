let seconds = 0;
let interval = null;
let running = false;

function formatTime(sec) {
    let mins = Math.floor(sec / 60);
    let secs = sec % 60;

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function toggleTimer() {
    const btn = document.getElementById("controlBtn");

    if (!running) {
        // START
        interval = setInterval(() => {
            seconds++;
            document.getElementById("timer").innerText = formatTime(seconds);
        }, 1000);

        btn.innerText = "⏹ Stop";
        btn.classList.add("stop");
        running = true;

    } else {
        // STOP
        clearInterval(interval);

        // send to flask
        fetch('/add_study', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ time: seconds })
        }).then(() => loadRecords());

        seconds = 0;
        document.getElementById("timer").innerText = "00:00";

        btn.innerText = "▶ Start";
        btn.classList.remove("stop");
        running = false;
    }
}

function loadRecords() {
    fetch('/get_study')
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("recordList");
        list.innerHTML = '';

        // show last 10
        const last = data.slice(-10).reverse();

        last.forEach(session => {
            const li = document.createElement("li");
            li.innerText = "⏱ " + formatTime(session.time);
            list.appendChild(li);
        });
    });
}

window.onload = loadRecords;