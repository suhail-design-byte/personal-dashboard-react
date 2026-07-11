import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/tasks';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Fetch tasks from the server when the component first loads
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  function handleAddTask() {
    const trimmedText = newTaskText.trim();
    if (trimmedText === '') return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmedText }),
    })
      .then((res) => res.json())
      .then((savedTask) => {
        setTasks([...tasks, savedTask]);
        setNewTaskText('');
      })
      .catch((err) => console.error('Error adding task:', err));
  }

  function handleToggleDone(id, currentDone) {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !currentDone }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(
          tasks.map((task) => (task._id === id ? updatedTask : task))
        );
      })
      .catch((err) => console.error('Error updating task:', err));
  }

  function handleDeleteTask(id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((err) => console.error('Error deleting task:', err));
  }

  return (
    <section className="task-list">
      <h2>Tasks</h2>

      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className={task.done ? 'task done' : 'task'}
            onClick={() => handleToggleDone(task._id, task.done)}
          >
            {task.text}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task._id);
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskList;