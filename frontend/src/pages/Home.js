import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const deleteTask = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <Link to="/add" className="add-button">+ Add Task</Link>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
            </div>
            <div className="actions">
              <Link to={`/edit/${task.id}`} ><button className="edit-button">Edit</button></Link>
              <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
