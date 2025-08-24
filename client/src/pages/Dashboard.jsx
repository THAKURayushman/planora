import { CheckSquare, BookOpen, Laptop, Flame } from "lucide-react";
import StudyCalendar from "../components/StudyCalendar";

export default function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Today’s Tasks */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckSquare className="text-yellow-400" /> Today’s Tasks
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✅ Revise Graph Algorithms</li>
          <li>📖 Read DBMS Notes</li>
          <li>💻 Work on Study Scheduler UI</li>
        </ul>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="text-yellow-400" /> Progress
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-yellow-400 h-4 rounded-full w-[60%]"></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">60% Completed This Week</p>
      </div>

      {/* Streaks / Motivation */}
      <div className="bg-gray-900 text-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Flame className="text-yellow-400" /> Streaks
        </h2>
        <p className="text-yellow-400 text-2xl font-bold">🔥 5 Days</p>
        <p className="text-sm text-gray-300 mt-2">Keep Going Strong!</p>
      </div>
      {/*Study Calendar */}
      <StudyCalendar />
    </div>
  );
}
