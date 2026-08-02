import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import apiClient from "../api/apiClient";
import { addUserList } from "../store/userListSlice";
import { formatTo12Hour } from "../utils/formateDate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((store) => store.userlist);
  const user = useSelector((store) => store.user);

  const getAllUserList = async () => {
    try {
      const res = await apiClient.get("/user/list");
      dispatch(addUserList(res.data.data.users));
    } catch (error) {
      if (error.response?.status !== 403) {
        toast.error(error?.response?.data?.message || "Failed to load users");
      }
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      getAllUserList();
    }
  }, [user]);

  if (user?.role !== "admin") return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">User List</h2>
          <p className="text-sm text-muted-foreground">
            Manage system users and roles
          </p>
        </div>
        <Button size="sm" onClick={() => navigate("/create/new")}>
          <Plus className="size-4" />
          Create User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            {userList?.length || 0} user(s) registered
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList?.map((u) => (
                <TableRow key={u._id}>
                  <TableCell className="font-medium">{u.username}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{u.role}</Badge>
                  </TableCell>
                  <TableCell>{formatTo12Hour(u.createdAt)}</TableCell>
                </TableRow>
              ))}

              {userList?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;
