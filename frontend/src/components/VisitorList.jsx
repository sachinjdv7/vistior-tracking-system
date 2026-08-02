import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import apiClient from "../api/apiClient";
import { addVisitorList } from "../store/visitorSlice";
import { formatTo12Hour, formatTotalTime } from "../utils/formateDate";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
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

const VisitorList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleVisitorOut = async (visitorId) => {
    try {
      await apiClient.patch(`/visitor/check-out/${visitorId}`);
      toast.success("Visitor checked out successfully!");
      getVisitorList();
    } catch (error) {
      console.error("Error checking out visitor:", error);
      toast.error(
        error?.response?.data?.message || "Failed to check out visitor"
      );
    }
  };

  useEffect(() => {
    getVisitorList();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Visitor List</h2>
          <p className="text-sm text-muted-foreground">
            View and manage all visitor records
          </p>
        </div>
        {user?.role === "security" && (
          <Button size="sm" onClick={() => navigate("/visitor/new")}>
            <Plus className="size-4" />
            Create Visitor
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Visitors</CardTitle>
          <CardDescription>
            {visitorList?.length || 0} visitor(s) recorded
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visitor No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Persons</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>In Time</TableHead>
                <TableHead>Out Time</TableHead>
                <TableHead>Total Time</TableHead>
                {user?.role !== "admin" && <TableHead>Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitorList?.map((visitor) => (
                <TableRow key={visitor._id}>
                  <TableCell className="font-medium">
                    {visitor.visitorNumber}
                  </TableCell>
                  <TableCell>{visitor.visitorName}</TableCell>
                  <TableCell>{visitor.mobileNumber}</TableCell>
                  <TableCell>{visitor.contactPerson}</TableCell>
                  <TableCell>{visitor.purpose}</TableCell>
                  <TableCell>{visitor.numberOfPersons}</TableCell>
                  <TableCell>{visitor.vehicleNumber || "—"}</TableCell>
                  <TableCell>
                    <StatusBadge status={visitor.meetingStatus} />
                  </TableCell>
                  <TableCell>{formatTo12Hour(visitor.inTime)}</TableCell>
                  <TableCell>{formatTo12Hour(visitor.outTime)}</TableCell>
                  <TableCell>{formatTotalTime(visitor.totalTimeSpent)}</TableCell>
                  {user?.role !== "admin" && (
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleVisitorOut(visitor._id)}
                        disabled={!!visitor.outTime}
                      >
                        OUT
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}

              {visitorList?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={user?.role !== "admin" ? 12 : 11}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No visitors found
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

export default VisitorList;
