import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, removeTask } from "../features/tasks/taskSlice";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.tasks);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      {/* Task form for add/edit */}
      <TaskForm taskToEdit={taskToEdit} clearEdit={() => setTaskToEdit(null)} />

      {/* Task list */}
      <div className="space-y-3 mt-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No tasks available.</p>
        ) : (
          items.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center p-3 border rounded shadow"
            >
              <div>
                <p className="font-medium">{task.title || "Untitled"}</p>
                <p className="text-sm text-gray-600">
                  Priority: {task.priority}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTaskToEdit(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(removeTask(task._id))}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
