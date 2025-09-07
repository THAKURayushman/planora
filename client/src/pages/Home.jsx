import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GuestLogin from "../components/GuestLogin";

function Home() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const buttons = [
    { text: "Login", action: () => navigate("/login") },
    { text: "Register", action: () => navigate("/register") },
    // We'll replace the Guest Login button here with the component
  ];

  const features = [
    {
      title: "Add Study Topics",
      description: "Keep track of the topics you study each day.",
    },
    {
      title: "Smart Study Schedule",
      description:
        "Plan your study sessions and get reminders for next revision.",
    },
    {
      title: "Spaced Repetition",
      description:
        "Retain knowledge effectively by revisiting topics at optimal intervals.",
    },
    {
      title: "Progress Tracking",
      description: "Visualize your study progress and daily achievements.",
    },
    {
      title: "Guest Access",
      description: "Try the app without creating an account.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const length = features.length;

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  const getPosition = (index) => {
    const diff = (index - currentIndex + length) % length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -length + 1) return "right";
    if (diff === length - 1 || diff === -1) return "left";
    return "hidden";
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-center px-4 py-12">
      {/* Hero Section */}
      <h1 className="text-5xl font-extrabold text-yellow-400 mb-4">Planora</h1>
      <p className="text-gray-300 text-lg max-w-lg mb-8">
        Organize your study sessions, track your progress, and retain knowledge
        efficiently.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.action}
            className="bg-gray-700 text-gray-200 px-6 py-2 rounded-lg font-semibold text-sm sm:text-base
                       transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 hover:text-gray-900"
          >
            {btn.text}
          </button>
        ))}

        {/* Guest Login Component */}
        <GuestLogin apiUrl={API_URL} />
      </div>

      {/* Carousel */}
      <div className="relative flex justify-center items-center w-full max-w-4xl h-[200px] overflow-hidden mb-12">
        <AnimatePresence>
          {features.map((f, idx) => {
            const pos = getPosition(idx);
            if (pos === "hidden") return null;
            return (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: pos === "left" ? -250 : 250,
                }}
                animate={{
                  opacity: 1,
                  scale: pos === "center" ? 1.05 : 0.95,
                  x: pos === "center" ? 0 : pos === "left" ? -250 : 250,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg w-[250px]"
                style={{
                  filter: pos === "center" ? "none" : "blur(2px)",
                  zIndex: pos === "center" ? 10 : 5,
                }}
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-300 text-sm">{f.description}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="text-gray-400 text-sm">
        <p>
          © 2025 Planora. All rights reserved. |{" "}
          <a
            href="https://github.com/THAKURayushman/planora"
            className="hover:text-yellow-400"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
