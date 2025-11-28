import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "./api/apiClient";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { addUser } from "./store/userSlice";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const getCurrentUser = async () => {
    try {
      const res = await apiClient.get("/auth/me");
      dispatch(addUser(res.data.data.user));
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.role === "security" && location.pathname === "/") {
      navigate("/visitor/list", { replace: true });
    }

    if (user.role === "admin" && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
      <Navbar />
      <main className="flex-1 px-4 py-2">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default App;
