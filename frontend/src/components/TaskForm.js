import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskForm.css';

function TaskForm({ task = {}, isEdit = false }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status || 'todo');
  const [dueDate, setDueDate] = useState(task.dueDate?.split('T')[0] || '');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, status, dueDate };
    const url = isEdit
      ? `${process.env.REACT_APP_API_URL}/tasks/${task.id}`
      : `${process.env.REACT_APP_API_URL}/tasks`;
    const method = isEdit ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <button type="submit">{isEdit ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
}

export default TaskForm;
