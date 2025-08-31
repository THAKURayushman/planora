import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import AddEditTaskModal from "../components/AddEditTaskModal";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleSave = async (taskData) => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      setModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const getPriorityRowClass = (priority) => {
    const p = Number(priority);
    if (p >= 9) return "bg-red-100 text-red-900";
    if (p >= 7) return "bg-orange-100 text-orange-900";
    if (p >= 4) return "bg-yellow-100 text-yellow-900";
    return "bg-green-100 text-green-900";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 Tasks</h1>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base"
        >
          + Add Task
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`p-4 border rounded-lg shadow ${getPriorityRowClass(
                  task.priority
                )}`}
              >
                <h3 className="font-semibold text-lg mb-2">
                  {task.title || "Untitled"}
                </h3>
                <p>
                  <span className="font-medium">Subject:</span>{" "}
                  {task.subject || "-"}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {task.duration || "-"}
                </p>
                <p>
                  <span className="font-medium">Priority:</span>{" "}
                  {task.priority || "-"}
                </p>
                <p>
                  <span className="font-medium">Deadline:</span>{" "}
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "-"}
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 text-center">Title</th>
                  <th className="border px-4 py-2 text-center">Subject</th>
                  <th className="border px-4 py-2 text-center">Duration</th>
                  <th className="border px-4 py-2 text-center">Priority</th>
                  <th className="border px-4 py-2 text-center">Deadline</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className={getPriorityRowClass(task.priority)}
                  >
                    <td className="border px-4 py-2 text-center">
                      {task.title || "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {task.subject || "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {task.duration || "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {task.priority || "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleEdit(task)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {modalOpen && (
        <AddEditTaskModal
          task={selectedTask}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
