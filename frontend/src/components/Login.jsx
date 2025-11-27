import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // console.log(username, password);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8082/api/v1/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Login successful:", res.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Login
      </h1>
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
    </>
  );
};

export default Login;
