import React, { useState } from "react";
import { post } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";

const SuccessMessage = ({ onClose }) => (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Reservation successful. Enjoy your meal!</strong>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg onClick={onClose} className="fill-current h-6 w-6 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a.5.5 0 1 1 .707.707L10.707 10l4.348 4.348a.5.5 0 0 1-.707.707L10 10.707l-4.348 4.348a.5.5 0 1 1-.707-.707L9.293 10 4.652 5.652a.5.5 0 1 1 .707-.707L10 9.293l4.348-4.348z"/></svg>
    </span>
  </div>
);

const ReservationForm = ({ restaurantId, tableId, date, time, seats, tableNum }) => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !phone) {
      setError("All fields are required");
      return;
    }

    const reservationTime = new Date(`${date}T${time}`);

    try {
      const data = {
        customerName,
        phone,
        seats,
        reservationTime,
        tableId,
      };

      const response = await post(
        data,
        `make-reservation/${restaurantId}/${tableId}`
      );

      if (!response || response.status === 404) {
        setError(data.error || "Failed to make reservation");
        return;
      }

      // Display success message
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error making reservation:", error);
      setError("Internal Server Error");
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    window.location.reload();  // Reload the page
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Make Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-gray-600"
          >
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Make Reservation
        </button>

        {showSuccessAlert && <SuccessMessage onClose={handleCloseAlert} />}
      </form>
    </div>
  );
};

export default ReservationForm;
