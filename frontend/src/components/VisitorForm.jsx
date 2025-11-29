import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router";

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
    console.log("files image", e.target.files);
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
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
    <div className="flex flex-col items-center justify-center mt-4 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 px-4">
      <h1 className="font-bold text-xl mb-2">Create Visitor</h1>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6 shadow-lg">
        {preview && (
          <div className="avatar flex justify-center mb-4">
            <div className="w-24 rounded">
              <img src={preview} alt="visitor photo" />
            </div>
          </div>
        )}
        <input
          type="file"
          className="file-input file-input-success"
          onChange={handlePhotoChange}
        />
        <label className="label">Visitor Number</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Visitor Number"
          onChange={(e) => setVisitorNumber(e.target.value)}
        />
        <label className="label">Visitor Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Visitor Name"
          onChange={(e) => setVisitorName(e.target.value)}
        />

        <label className="label mt-2">Mobile Number</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <label className="label mt-2">Contact Person</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Contact Person"
          onChange={(e) => setContactPerson(e.target.value)}
        />

        <label className="label mt-2">Purpose</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Purpose"
          onChange={(e) => setPurpose(e.target.value)}
        />

        <label className="label mt-2">No of Persons</label>
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="Number of Persons"
          onChange={(e) => setNumberOfPersons(e.target.value)}
        />

        <label className="label mt-2">Vehicle Number (Optional)</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Vehicle Number"
          onChange={(e) => setVehicleNumber(e.target.value)}
        />

        <button
          onClick={handleCreateVisitor}
          className="btn btn-success text-amber-50 mt-6 w-full"
        >
          Create Visitor
        </button>
      </fieldset>
    </div>
  );
};

export default VisitorForm;
