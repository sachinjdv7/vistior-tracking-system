import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Video } from "lucide-react";
import apiClient from "../api/apiClient";
import { addAssignedVisitors } from "../store/visitorSlice";
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

  const updateVisitorStatus = async (visitorId) => {
    try {
      await apiClient.patch(`/visitor/meeting-status/${visitorId}`);
      getAllAssignedVisitors();
      toast.success("Visitor status updated successfully");
    } catch (error) {
      console.error("Error updating visitor status:", error);
      toast.error("Failed to update visitor status");
    }
  };

  useEffect(() => {
    getAllAssignedVisitors();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Assigned Visitors
        </h2>
        <p className="text-sm text-muted-foreground">
          Visitors assigned to you for meetings
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Visitors</CardTitle>
          <CardDescription>
            {visitorList?.length || 0} visitor(s) assigned
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
                <TableHead>Action</TableHead>
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
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => updateVisitorStatus(visitor._id)}
                      disabled={
                        visitor.meetingStatus === "OUT" ||
                        visitor.meetingStatus === "IN_MEETING"
                      }
                    >
                      <Video className="size-4" />
                      Meeting
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {visitorList?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No assigned visitors found
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

export default AssignedVisitors;
