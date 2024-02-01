import React, { useState, useEffect } from "react";
import { get } from "../../api/api";

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const dateOptions = { day: "numeric", month: "numeric", year: "numeric" };
  const timeOptions = { hour: "numeric", minute: "numeric" };

  const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
  const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);

  return { formattedDate, formattedTime };
};

const ReservationDetails = ({ reservation, onClose }) => {
  const restaurantId = localStorage.getItem("restaurantId");
  const [reservationData, setReservationData] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedTime, setFormattedTime] = useState(null);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const data = await get(`get-reservation/${restaurantId}/${reservation}`);
        setReservationData(data);

        const { formattedDate, formattedTime } = formatDateTime(data.reservationTime);

        setFormattedDate(formattedDate);
        setFormattedTime(formattedTime);
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    fetchReservationDetails();
  }, [restaurantId, reservation]);

  if (!reservationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Reservation Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 font-bold">Customer Name:</p>
          <p>{reservationData.customerName}</p>
        </div>
        <div>
          <p className="text-gray-600 font-bold">Phone:</p>
          <p>{reservationData.phone}</p>
        </div>
        <div>
          <p className="text-gray-600 font-bold">Reservation Time:</p>
          <p>Date: {formattedDate}</p>
          <p>Hour: {formattedTime}</p>
        </div>
        <div>
          <p className="text-gray-600 font-bold">Seats:</p>
          <p>{reservationData.seats}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
