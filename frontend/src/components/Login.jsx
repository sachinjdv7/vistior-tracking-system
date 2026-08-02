import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LogIn } from "lucide-react";
import apiClient from "../api/apiClient";
import { addUser } from "../store/userSlice";
import { ROLE_ROUTE_MAP } from "../constants/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await apiClient.post("/auth/login", {
        username,
        password,
      });
      dispatch(addUser(res.data.data.user));
      toast.success("Login successful!");
      navigate(ROLE_ROUTE_MAP[res?.data?.data?.user?.role]);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin} className="w-full" size="lg">
            <LogIn className="size-4" />
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
