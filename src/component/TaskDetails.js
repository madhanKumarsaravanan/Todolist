import React from 'react';

export default function TaskDetails({ task, back }) {
  if (!task) return <div>Task not found</div>;

  return (
    <div className="task-details-container">
      <button onClick={back} style={{ marginBottom: '20px' }}>Back to List</button>
      <h2>{task.title}</h2>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Description:</strong></p>
      <p>{task.description || "No description provided."}</p>
    </div>
  );
}
