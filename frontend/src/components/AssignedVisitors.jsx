import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { addAssignedVisitors } from "../store/visitorSlice";

const AssignedVisitors = () => {
  const dispatch = useDispatch();
  const visitorList = useSelector((state) => state.visitor);

  const getAllAssignedVisitors = async () => {
    try {
      const res = await apiClient.get("/visitor/assigned");
      dispatch(addAssignedVisitors(res.data.data.visitors));
    } catch (error) {
      console.error("Error fetching assigned visitors:", error);
      toast.error("Failed to fetch assigned visitors");
    }
  };

  useEffect(() => {
    getAllAssignedVisitors();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-1">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold">Assigned Visitors</h2>
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
                <th>Total Time (min)</th>
                <th>Action</th>
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
                        visitor.meetingStatus === "IN_MEETING"
                          ? "badge-warning"
                          : visitor.outTime
                          ? "badge-error"
                          : "badge-success"
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

                  <td>
                    {visitor.totalTimeSpent !== undefined
                      ? `${visitor.totalTimeSpent} min`
                      : "-"}
                  </td>

                  <td>
                    <button className="btn btn-sm btn-warning">meeting</button>
                  </td>
                </tr>
              ))}

              {visitorList?.length === 0 && (
                <tr>
                  <td colSpan="12" className="text-center py-3 opacity-70">
                    No assigned visitors found
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

export default AssignedVisitors;
