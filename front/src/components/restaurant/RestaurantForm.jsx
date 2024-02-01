import React, { useState } from "react";
import { post } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const RestaurantForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    psw: "",
    image: "",
    limitedSeats: 0,
    openingHour: "",
    closingHour: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      // Add any headers you need here
      // "Content-Type": "multipart/form-data", // Example header for FormData
    };

    // Create FormData object and append fields
    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      body.append(key, value);
    });

    try {
        console.log(formData);
        console.log("headers:", JSON.stringify(headers));
      // Use the post function from api.jsx
      const response = await post(formData, `register`);
      if (response) {
        navigate(`/login`);
      }
      // Handle the response as needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Restaurant Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="psw"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="psw"
            name="psw"
            value={formData.psw}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Upload Restaurant Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={handleChange}
            placeholder="Enter Image URL"
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="limitedSeats"
            className="block text-sm font-medium text-gray-600"
          >
            Limited Seats
          </label>
          <input
            type="number"
            id="limitedSeats"
            name="limitedSeats"
            value={formData.limitedSeats}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="openingHour"
            className="block text-sm font-medium text-gray-600"
          >
            Opening Hour:
          </label>
          <input
            type="time"
            id="openingHour"
            name="openingHour"
            value={formData.openingHour}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="closingHour"
            className="block text-sm font-medium text-gray-600"
          >
            Closing Hour:
          </label>
          <input
            type="time"
            id="closingHour"
            name="closingHour"
            value={formData.closingHour}
            onChange={handleChange}
            required
          />
        </div>

        {/* Repeat the above structure for other form fields */}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;
