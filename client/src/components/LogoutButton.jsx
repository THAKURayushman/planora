// src/components/LogoutButton.jsx
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()); // Redux state clear
    navigate("/"); // redirect to Home page
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-yellow-400 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-yellow-500 text-sm sm:text-base"
    >
      Logout
    </button>
  );
}
