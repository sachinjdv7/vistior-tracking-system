import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "./api/apiClient";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { addUser } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default App;
