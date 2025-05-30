import React, { useState } from 'react';
import TaskList from '../src/component/TaskList';
import TaskDetails from '../src/component/TaskDetails';

function App() {
  const [tasks, setTasks] = useState([
    // Sample initial tasks
    {
      id: 1,
      title: 'Buy groceries',
      status: 'pending',
      dueDate: '2025-06-05',
      description: 'Milk, Bread, Eggs, Butter'
    },
    {
      id: 2,
      title: 'Finish project',
      status: 'in-progress',
      dueDate: '2025-06-10',
      description: 'Complete all remaining modules'
    }
  ]);

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Update task status by id
  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // Add new task
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  // Select task to show details
  const selectTask = (id) => setSelectedTaskId(id);

  // Go back to list
  const backToList = () => setSelectedTaskId(null);

  // Find selected task for details page
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div className="App">
      {selectedTaskId ? (
        <TaskDetails task={selectedTask} back={backToList} />
      ) : (
        <TaskList
          tasks={tasks}
          updateStatus={updateTaskStatus}
          addTask={addTask}
          selectTask={selectTask}
        />
      )}
    </div>
  );
}

export default App;
