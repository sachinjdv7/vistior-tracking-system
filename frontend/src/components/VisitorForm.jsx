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

  const navigate = useNavigate();

  const handleCreateVisitor = async () => {
    try {
      const payload = {
        visitorNumber,
        visitorName,
        mobileNumber,
        contactPerson,
        purpose,
        numberOfPersons,
        vehicleNumber,
      };
      await apiClient.post("visitor/check-in", payload);
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
