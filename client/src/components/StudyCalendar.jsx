import { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";
import { Flame } from "lucide-react";

export default function StudyCalendar() {
  const [date, setDate] = useState(new Date());

  const events = [
    { date: "2025-08-24", type: "start", topic: "Graph Algorithms" },
    { date: "2025-08-25", type: "revision", topic: "DSA Arrays" },
    { date: "2025-08-26", type: "streak", topic: null },
  ];

  const tileContent = ({ date, view }) => {
    const event = events.find(
      (e) => new Date(e.date).toDateString() === date.toDateString()
    );
    if (!event) return null;

    return (
      <div className="relative w-full h-full flex justify-center items-center">
        {event.type === "start" && (
          <span className="w-3 h-3 bg-yellow-400 rounded-full absolute top-1/2 transform -translate-y-1/2"></span>
        )}
        {event.type === "revision" && (
          <span className="w-3 h-3 border-2 border-yellow-400 rounded-full absolute top-1/2 transform -translate-y-1/2"></span>
        )}
        {event.type === "streak" && (
          <Flame className="w-4 h-4 text-yellow-400 absolute top-1/2 transform -translate-y-1/2" />
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-2xl p-4">
      <h2 className="text-lg font-bold mb-4">📅 Study Calendar</h2>
      <Calendar value={date} onChange={setDate} tileContent={tileContent} />
    </div>
  );
}
