from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Temporary storage (later we use database)
tasks = []
notes = []
events = []
study_sessions = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/study')
def study():
    return render_template('study.html')

@app.route('/tasks')
def task_page():
    return render_template('tasks.html')

@app.route('/calendar')
def calendar():
    return render_template('calendar.html')

@app.route('/notes')
def notes_page():
    return render_template('notes.html')


# ---------------- TASK API ----------------

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.json
    tasks.append(data)
    return jsonify({"message": "Task added"})

@app.route('/get_tasks')
def get_tasks():
    return jsonify(tasks)


# ---------------- NOTES API ----------------

@app.route('/add_note', methods=['POST'])
def add_note():
    data = request.json
    notes.append(data)
    return jsonify({"message": "Note added"})

@app.route('/get_notes')
def get_notes():
    return jsonify(notes)


# ---------------- STUDY TIMER ----------------

@app.route('/add_study', methods=['POST'])
def add_study():
    data = request.json
    study_sessions.append(data)
    return jsonify({"message": "Session saved"})

@app.route('/get_study')
def get_study():
    return jsonify(study_sessions)


# ---------------- CALENDAR ----------------

@app.route('/add_event', methods=['POST'])
def add_event():
    data = request.json
    events.append(data)
    return jsonify({"message": "Event added"})

@app.route('/get_events')
def get_events():
    return jsonify(events)



   

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))