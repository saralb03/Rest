import React, { useState } from "react";
import ReservationDetails from "../reservation/ReservationDetails";

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const dateOptions = { day: "numeric", month: "numeric", year: "numeric" };
  const timeOptions = { hour: "numeric", minute: "numeric" };

  const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
  const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);

  return { formattedDate, formattedTime };
};

const ReservationList = ({ reservations }) => {
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Sort reservations by date
  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.reservationTime) - new Date(b.reservationTime)
  );

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseReservationDetails = () => {
    setSelectedReservation(null);
  };

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4 flex flex-wrap">
        Reservations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedReservations.map((reservation) => {
          const { formattedDate, formattedTime } = formatDateTime(
            reservation.reservationTime
          );

          return (
            <div
              key={reservation._id}
              className="border rounded p-3 bg-white cursor-pointer"
              onClick={() => handleReservationClick(reservation)}
            >
              <p className="text-lg font-semibold">
                Customer: {reservation.customerName}
              </p>
              <p>Seats: {reservation.seats}</p>
              <p>Date: {formattedDate}</p>
            </div>
          );
        })}
      </div>

      {/* Display ReservationDetails for the selected reservation */}
      {selectedReservation && (
        <ReservationDetails
          reservation={selectedReservation._id}
          onClose={handleCloseReservationDetails}
        />
      )}
    </div>
  );
};

export default ReservationList;
