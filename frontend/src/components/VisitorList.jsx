import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { addVisitorList } from "../store/visitorSlice";

const VisitorList = () => {
  const dispatch = useDispatch();
  const visitorList = useSelector((store) => store.visitor);
  const user = useSelector((store) => store.user);

  const getVisitorList = async () => {
    try {
      const res = await apiClient.get("/visitor/list");
      dispatch(addVisitorList(res.data.data.visitors));
    } catch (error) {
      console.error("Error fetching visitor list:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch visitor list"
      );
    }
  };

  useEffect(() => {
    getVisitorList();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-1">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold">Visitor List</h2>
        {user?.role === "security" && (
          <button
            //   onClick={() => navigate("/create/new")}
            className="btn btn-sm btn-primary"
          >
            + Create User
          </button>
        )}
      </div>

      <div className="bg-base-100 shadow rounded-md">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Visitor No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Contact Person</th>
                <th>Purpose</th>
                <th>Persons</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>In Time</th>
                <th>Out Time</th>
              </tr>
            </thead>

            <tbody>
              {visitorList?.map((visitor) => (
                <tr key={visitor._id}>
                  <td className="font-medium">{visitor.visitorNumber}</td>
                  <td>{visitor.visitorName}</td>
                  <td>{visitor.mobileNumber}</td>
                  <td>{visitor.contactPerson}</td>
                  <td>{visitor.purpose}</td>
                  <td>{visitor.numberOfPersons}</td>
                  <td>{visitor.vehicleNumber || "-"}</td>

                  <td>
                    <span
                      className={`badge badge-sm ${
                        visitor.meetingStatus === "IN"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {visitor.meetingStatus}
                    </span>
                  </td>

                  <td>
                    {visitor.inTime
                      ? new Date(visitor.inTime).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    {visitor.outTime
                      ? new Date(visitor.outTime).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}

              {visitorList?.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-3 opacity-70">
                    No visitors found
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

export default VisitorList;
