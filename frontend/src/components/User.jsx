import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { useState } from "react";

const User = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const hanldeCreateUser = async () => {
    try {
      await apiClient.post("/user/create", { username, password, role });
      toast.success("User created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Create user failed:", error);
      toast.error(error?.response?.data?.message || "Create User Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 px-4">
      <h1 className="font-bold">Create User!!!</h1>
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
        <label className="label mt-2">Role</label>
        <select
          className="select select-bordered w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="hr">HR</option>
          <option value="manager">Manager</option>
          <option value="security">Security</option>
        </select>
        <button
          onClick={hanldeCreateUser}
          className="btn btn-success text-amber-50 mt-6 w-full"
        >
          Create User
        </button>
      </fieldset>
    </div>
  );
};

export default User;
