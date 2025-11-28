import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import apiClient from "../api/apiClient";
import { addUser } from "../store/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleLogin = async () => {
    try {
      const res = await apiClient.post("/auth/login", {
        username,
        password,
      });
      dispatch(addUser(res.data.data.user));
      toast.success("Login successful!");
      const roleRouteMap = {
        admin: "/",
        security: "/visitor/list",
        manager: "/visitor/assign",
        hr: "/visitor/assign",
      };

      navigate(roleRouteMap[res?.data?.data?.user?.role]);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 px-4">
      <h1 className="font-bold">Welcome Back !!!</h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6 shadow-lg">
        <label className="label">Username</label>
        <input
          type="username"
          className="input input-bordered w-full"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label mt-2">Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="btn btn-neutral mt-6 w-full">
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
