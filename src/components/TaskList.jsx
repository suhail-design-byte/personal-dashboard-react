import { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', done: false },
    { id: 2, text: 'Finish MERN stack project', done: false },
    { id: 3, text: 'Read ESP32 documentation', done: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  function handleAddTask() {
    const trimmedText = newTaskText.trim();
    if (trimmedText === '') return;

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  }

  function handleToggleDone(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
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
            key={task.id}
            className={task.done ? 'task done' : 'task'}
            onClick={() => handleToggleDone(task.id)}
          >
            {task.text}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task.id);
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