let currentDate = new Date();

function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const dates = document.getElementById("dates");

    dates.innerHTML = '';

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYear.innerText = currentDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric'
    });

    // empty slots
    for (let i = 0; i < firstDay; i++) {
        dates.innerHTML += `<div></div>`;
    }

    fetch('/get_events')
    .then(res => res.json())
    .then(events => {

        for (let day = 1; day <= lastDate; day++) {

            const fullDate = `${year}-${month+1}-${day}`;

            const event = events.find(e => e.date === fullDate);

            let eventText = event ? `<div class="event">${event.text}</div>` : '';

            const div = document.createElement("div");
            div.className = "date";
            div.innerHTML = `${day} ${eventText}`;

            div.onclick = () => addEvent(fullDate);

            dates.appendChild(div);
        }

    });
}

function addEvent(date) {
    const text = prompt("Enter event:");

    if (!text) return;

    fetch('/add_event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: date, text: text })
    }).then(() => renderCalendar());
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

window.onload = renderCalendar;