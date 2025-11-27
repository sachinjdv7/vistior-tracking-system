import { useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { addUserList } from "../store/userListSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((store) => store.userlist);

  const getAllUserList = async () => {
    try {
      const res = await apiClient.get("/user/list");
      dispatch(addUserList(res.data.data.users));
    } catch (error) {
      console.error("Error fetching user list:", error);
      toast.error(error?.response?.data?.message || "Failed get all users");
    }
  };

  useEffect(() => {
    getAllUserList();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-1">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold">User List</h2>

        <button className="btn btn-sm btn-primary">+ Create User</button>
      </div>

      <div className="bg-base-100 shadow rounded-md">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {userList?.map((user) => (
                <tr key={user._id}>
                  <td className="font-medium">{user.username}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))}

              {userList?.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-3 opacity-70">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
