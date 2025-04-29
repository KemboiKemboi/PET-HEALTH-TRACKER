// src/pages/RegisterPet.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function RegisterPet() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    vaccinated: false,
    last_checkup: "",
    diet: "",
    owner_name: "",
    owner_contact: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const petData = {
      name: formData.name,
      type: formData.type,
      age: Number(formData.age),
      vaccinated: formData.vaccinated,
      last_checkup: formData.last_checkup,
      diet: formData.diet.split(",").map((item) => item.trim()),
      owner: {
        name: formData.owner_name,
        contact: formData.owner_contact,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        Swal.fire("Success!", "Pet registered successfully!", "success");
        navigate("/");
      } else {
        Swal.fire("Error", "Failed to register pet", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server not reachable", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Register a New Pet</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
        <input name="name" placeholder="Pet Name" className="w-full p-2 border" onChange={handleChange} required />
        <input name="type" placeholder="Pet Type (e.g., Dog)" className="w-full p-2 border" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" className="w-full p-2 border" onChange={handleChange} required />
        <label className="flex items-center">
          <input name="vaccinated" type="checkbox" className="mr-2" onChange={handleChange} />
          Vaccinated
        </label>
        <input name="last_checkup" type="date" className="w-full p-2 border" onChange={handleChange} required />
        <input name="diet" placeholder="Diet (comma separated)" className="w-full p-2 border" onChange={handleChange} />
        <input name="owner_name" placeholder="Owner Name" className="w-full p-2 border" onChange={handleChange} required />
        <input name="owner_contact" placeholder="Owner Contact" className="w-full p-2 border" onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Register Pet</button>
      </form>
    </div>
  );
}

export default RegisterPet;
