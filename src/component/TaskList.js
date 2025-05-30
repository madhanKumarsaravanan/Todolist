import React, { useState, useEffect } from "react";
import "../App.css";

const API_URL = "http://localhost:4000/tasks";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [display, setDisplay] = useState("all");

  // Fetch tasks from backend on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  // Add new task
  async function addTask() {
    if (newTaskText.trim() === "") return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTaskText }),
      });
      const createdTask = await res.json();
      setTasks((prev) => [...prev, createdTask]);
      setNewTaskText("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // Toggle complete status (update backend and frontend)
  async function toggleComplete(id) {
    const taskToToggle = tasks.find((t) => t._id === id);
    if (!taskToToggle) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !taskToToggle.complete }),
      });
      const updatedTask = await res.json();

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }

  // Delete task
  async function deleteTask(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Filter tasks based on display and search query
  const filteredTasks = tasks
    .filter((t) => {
      if (display === "active") return !t.complete;
      if (display === "complete") return t.complete;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(searchQuery.toLowerCase()));

  const remainingCount = tasks.filter((t) => !t.complete).length;

  return (
    <div className="container">
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Enter Todo"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button className="add-btn" onClick={addTask}>
        Add
      </button>

      <input
        type="text"
        placeholder="Search Task..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input search"
      />

      <div>
        <button onClick={() => setDisplay("all")}>All</button>
        <button onClick={() => setDisplay("active")}>Active</button>
        <button onClick={() => setDisplay("complete")}>Complete</button>
      </div>

      <ul type="none">
        {filteredTasks.map((t) => (
          <li key={t._id} className="task-item">
            <span
              className={t.complete ? "completed" : ""}
              onClick={() => toggleComplete(t._id)}
              style={{ cursor: "pointer" }}
            >
              {t.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(t._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="remaining">
        <strong>{remainingCount}</strong> tasks remaining
      </div>
    </div>
  );
}
