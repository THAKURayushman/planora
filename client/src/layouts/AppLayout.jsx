import { Outlet, Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton"; // LogoutButton component

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar - only on md+ */}
      <aside className="hidden md:flex flex-col w-60 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">📚 Planora</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:text-yellow-400">
            Dashboard
          </Link>
          <Link to="/tasks" className="hover:text-yellow-400">
            Tasks
          </Link>
          <Link to="/profile" className="hover:text-yellow-400">
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-14 flex items-center justify-between px-4 border-b bg-white shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold truncate">
            Welcome Back 👋
          </h2>
          <LogoutButton />
        </header>

        {/* Outlet for pages */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Bottom bar for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around bg-gray-900 text-white py-2 border-t">
        <Link to="/dashboard" className="hover:text-yellow-400">
          🏠
        </Link>
        <Link to="/tasks" className="hover:text-yellow-400">
          📋
        </Link>
        <Link to="/profile" className="hover:text-yellow-400">
          👤
        </Link>
      </nav>
    </div>
  );
}
