import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(t => t.id === id);
        if (found) setTask(found);
      });
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Task</h2>
      <TaskForm task={task} isEdit />
    </div>
  );
}

export default EditTask;
