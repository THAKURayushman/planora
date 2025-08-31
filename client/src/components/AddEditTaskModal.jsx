import { useState, useEffect } from "react";

export default function AddEditTaskModal({ task, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    duration: 30,
    priority: 5,
    deadline: "",
    status: "todo",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        subject: task.subject || "",
        duration: task.duration || 30,
        priority: task.priority || 5,
        deadline: task.deadline ? task.deadline.split("T")[0] : "",
        status: task.status || "todo",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["duration", "priority"].includes(name)) {
      setFormData((s) => ({ ...s, [name]: Number(value) }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.duration) return;
    if (formData.duration < 5) return;

    const payload = {
      title: formData.title.trim(),
      subject: formData.subject.trim() || undefined, // avoid empty ""
      duration: Number(formData.duration),
      priority: Number(formData.priority),
      deadline: formData.deadline
        ? new Date(formData.deadline).toISOString()
        : undefined,
      status: formData.status || "todo", // enum safe
    };
    console.log("➡️ Payload to send:", payload);
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Title */}
          <label className="text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          {/* Subject */}
          <label className="text-sm font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="E.g. Math, Science"
            value={formData.subject}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Duration & Priority */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium">
                Duration (mins) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="duration"
                min={5}
                value={formData.duration}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
              <p className="text-xs text-gray-500">Minimum 5 minutes</p>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium">
                Priority (1–10):{" "}
                <span className="font-semibold">{formData.priority}</span>
              </label>
              <input
                type="range"
                name="priority"
                min={1}
                max={10}
                value={formData.priority}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Deadline */}
          <label className="text-sm font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
