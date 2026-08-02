import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { UserPlus, Upload } from "lucide-react";
import apiClient from "../api/apiClient";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const VisitorForm = () => {
  const [visitorNumber, setVisitorNumber] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [purpose, setPurpose] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateVisitor = async () => {
    try {
      if (!photo) {
        toast.error("Please upload a photo of the visitor");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", photo);
      formData.append("visitorNumber", visitorNumber);
      formData.append("visitorName", visitorName);
      formData.append("mobileNumber", mobileNumber);
      formData.append("contactPerson", contactPerson);
      formData.append("purpose", purpose);
      formData.append("numberOfPersons", numberOfPersons);
      formData.append("vehicleNumber", vehicleNumber);

      await apiClient.post("visitor/check-in", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Visitor Created Successfully!");
      navigate("/visitor/list");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create visitor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Visitor</CardTitle>
          <CardDescription>Register a new visitor check-in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="size-20">
              {preview ? (
                <AvatarImage src={preview} alt="Visitor photo" />
              ) : (
                <AvatarFallback className="text-lg">Photo</AvatarFallback>
              )}
            </Avatar>
            <Label
              htmlFor="photo"
              className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Upload className="size-4" />
              Upload visitor photo
            </Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitorNumber">Visitor Number</Label>
            <Input
              id="visitorNumber"
              type="text"
              placeholder="Visitor Number"
              value={visitorNumber}
              onChange={(e) => setVisitorNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visitorName">Visitor Name</Label>
            <Input
              id="visitorName"
              type="text"
              placeholder="Visitor Name"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              type="text"
              placeholder="Contact Person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              type="text"
              placeholder="Purpose of visit"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numberOfPersons">Number of Persons</Label>
            <Input
              id="numberOfPersons"
              type="number"
              min={1}
              placeholder="Number of Persons"
              value={numberOfPersons}
              onChange={(e) => setNumberOfPersons(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber">Vehicle Number (Optional)</Label>
            <Input
              id="vehicleNumber"
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateVisitor} className="w-full" size="lg">
            <UserPlus className="size-4" />
            Create Visitor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorForm;
