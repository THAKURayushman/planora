import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />}
        />

        {/* Auth Pages */}
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <RegisterForm />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginForm />}
        />

        {/* Protected Routes */}
        <Route element={user ? <AppLayout /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch-all: redirect anywhere else */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
