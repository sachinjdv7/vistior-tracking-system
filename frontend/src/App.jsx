import { Outlet, useNavigate } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import apiClient from "./api/apiClient";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      const user = await apiClient.get("/auth/me");
      console.log("Current user:", user.data.data.user);
      dispatch(addUser(user.data.data.user));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
