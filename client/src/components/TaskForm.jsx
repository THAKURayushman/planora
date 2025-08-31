import { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    duration: 5,
    priority: "medium",
    deadline: "",
    status: "todo",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <input
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={formData.duration}
        onChange={handleChange}
        min="5"
        required
      />

      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
