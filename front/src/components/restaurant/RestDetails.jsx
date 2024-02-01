import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReservationForm from "../reservation/ReservationForm";
import { get } from "../../api/api";

const RestDetails = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    img_url: "",
    address: "",
    phone: "",
    email: "",
    capacity: 0,
    limitedSeats: 0,
    tables: [],
    hoursOfOperation: { openingHour: "", closingHour: "" }
  });
  const { restaurantId } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [tableId, setTableId] = useState(null);
  const [tableNum, setTableNum] = useState(null);
  const [showAvailableTables, setShowAvailableTables] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const data = await get(`restaurant/${restaurantId}`);
        setRestaurantDetails(data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  const getAvailableTable = async (date, time, seats) => {
    try {
      const response = await get(
        `available-table?restaurantId=${restaurantId}&date=${date}&time=${time}&seats=${seats}`
      );

      if (response && response.status === 404) {
        setShowAvailableTables(false);
        return null;
      }

      const { tableNumber, capacity, id } = response;
      return { tableNumber, capacity, id };
    } catch (error) {
      console.error("Error fetching available table:", error.message);
      throw new Error("Error fetching available table.");
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onReload = () => {
    window.location.reload();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);

    if (!restaurantDetails.tables || restaurantDetails.tables.length === 0) {
      setShowAvailableTables(false);
      setSearched(true);
      return;
    }

    if (restaurantId && date && time && seats) {
      try {
        const availableTables = await getAvailableTable(date, time, seats);
        if (availableTables) {
          setTableId(availableTables.id);
          setTableNum(availableTables.tableNumber);
          setShowAvailableTables(true);
        } else {
          setShowAvailableTables(false);
          setSearched(true);
        }
      } catch (error) {
        console.error("Error getting available table ID:", error);
        if (error.response && error.response.status === 400) {
          // Bad Request (e.g., validation error in the request)
          alert("Invalid input. Please check your search criteria.");
        } else {
          // Other errors
          alert(
            "there is no available table for this amount of people. Please try again later."
          );
        }
        setShowAvailableTables(false);
        setSearched(true);
        window.location.reload();
      }
    } else {
      setShowAvailableTables(false);
    }
  };

  return (
    <div className="mx-auto p-4 bg-whiteF">
      <div className="relative mb-4">
        <img
          src={restaurantDetails.img_url}
          alt={restaurantDetails.name}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">
            {restaurantDetails.name}
          </h2>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between p-5 pt-0">
        <p className="text-gray-600 font-bold">{restaurantDetails.address}</p>
        <span className="text-gray-600 text-lg">&#8226;</span>
        <p className="text-gray-600 font-bold">{restaurantDetails.phone}</p>
        <span className="text-gray-600 text-lg">&#8226;</span>
        <p className="text-gray-600 font-bold">{restaurantDetails.email}</p>
        <span className="text-gray-600 text-lg">&#8226;</span>
        <p className="text-gray-600 font-bold">
  {new Date(restaurantDetails.hoursOfOperation.openingHour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-
  {new Date(restaurantDetails.hoursOfOperation.closingHour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</p>

      </div>

      {searched &&
        !showAvailableTables &&
        (!restaurantDetails.tables ||
          restaurantDetails.tables.length === 0) && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              No tables available at this time in the restaurant
            </h2>
            <button onClick={onReload}>return to restaurant</button>
          </div>
        )}

      {searched && showAvailableTables && (
        <ReservationForm
          restaurantId={restaurantId}
          tableId={tableId}
          date={date}
          time={time}
          seats={seats}
          tableNumber={tableNum}
        />
      )}

      {!searched && (
        <form onSubmit={handleSearch} className="mb-4 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-600"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getCurrentDate()}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-600"
              >
                Time:
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-gray-600"
              >
                Number of Seats:
              </label>
              <input
                type="number"
                id="seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default RestDetails;
