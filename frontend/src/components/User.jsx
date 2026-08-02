import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import apiClient from "../api/apiClient";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const User = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const handleCreateUser = async () => {
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
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create User</CardTitle>
          <CardDescription>Add a new user to the system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreateUser} className="w-full" size="lg">
            <UserPlus className="size-4" />
            Create User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default User;
