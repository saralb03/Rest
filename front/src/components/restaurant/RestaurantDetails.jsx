import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, remove, patch } from "../../api/api";
import TableList from "../table/TableList";
import ReservationList from "../reservation/ReservationList";
import AddTableForm from "../table/AddTableForm";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";

export function CustomSpinner() {
  // return <Spinner className="h-16 w-16 text-gray-900/50" />
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner className="h-16 w-16 text-gray-900/50" />
    </div>
  );
}

const formatTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const timeOptions = { hour: "numeric", minute: "numeric" };
  return dateTime.toLocaleTimeString(undefined, timeOptions);
};

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    limitedSeats: 0,
    hoursOfOperation: { openingHour: "", closingHour: "" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurantData = await get(`restaurant/${restaurantId}`);
        setRestaurant(restaurantData);

        const tablesData = await get(`get-tables/${restaurantId}`);
        setTables(tablesData);

        const reservationsData = await get(`get-reservations/${restaurantId}`);
        setReservations(reservationsData);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  const onAddTable = async () => {
    const tablesData = await get(`get-tables/${restaurantId}`);
    setTables(tablesData);
  };

  const onTableDeleted = async () => {
    const tablesData = await get(`get-tables/${restaurantId}`);
    setTables(tablesData);
  };

  const onDeleteRestaurant = async () => {
    try {
      await remove(`delete-restaurant/${restaurantId}`);
      localStorage.removeItem("token");
      localStorage.removeItem("restaurantId");
      navigate("/");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const onEditRestaurant = () => {
    setIsEditing(true);
    setEditedRestaurant({
      name: restaurant.name,
      email: restaurant.email,
      address: restaurant.address,
      phone: restaurant.phone,
      limitedSeats: restaurant.limitedSeats,
      hoursOfOperation: {
        openingHour: restaurant.hoursOfOperation.openingHour
          .split("T")[1]
          .substr(0, 5), // Assuming the format is "HH:mm"
        closingHour: restaurant.hoursOfOperation.closingHour
          .split("T")[1]
          .substr(0, 5), // Assuming the format is "HH:mm"
      },
    });
  };

  const onCancelEdit = () => {
    setIsEditing(false);
  };

  const onSaveEdit = async () => {
    console.log(
      editedRestaurant.hoursOfOperation.closingHour,
      editedRestaurant.hoursOfOperation.openingHour
    );

    try {
      const response = await patch(
        {
          ...editedRestaurant,
          hoursOfOperation: {
            openingHour: editedRestaurant.hoursOfOperation.openingHour,
            closingHour: editedRestaurant.hoursOfOperation.closingHour,
          },
        },
        `update-restaurant/${restaurantId}`
      );

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Failed to update restaurant:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating restaurant:", error.message);
    }
  };

  if (!restaurant) {
    return CustomSpinner();
  }

  return (
    <div className="container mx-auto p-4 items-center">
      <div className="relative mb-4">
        <img
          src={restaurant.img_url}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">{restaurant.name}</h2>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{restaurant.address}</p>

      {isEditing ? (
        <div className="mb-4">
          <label className="text-gray-600">Name:</label>
          <input
            type="text"
            value={editedRestaurant.name}
            onChange={(e) =>
              setEditedRestaurant({ ...editedRestaurant, name: e.target.value })
            }
            className="border rounded px-2 py-1 w-full mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="text-gray-600">Email:</label>
          <input
            type="text"
            value={editedRestaurant.email}
            onChange={(e) =>
              setEditedRestaurant({
                ...editedRestaurant,
                email: e.target.value,
              })
            }
            className="border rounded px-2 py-1 w-full mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="text-gray-600">Address:</label>
          <input
            type="text"
            value={editedRestaurant.address}
            onChange={(e) =>
              setEditedRestaurant({
                ...editedRestaurant,
                address: e.target.value,
              })
            }
            className="border rounded px-2 py-1 w-full mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="text-gray-600">Phone:</label>
          <input
            type="text"
            value={editedRestaurant.phone}
            onChange={(e) =>
              setEditedRestaurant({
                ...editedRestaurant,
                phone: e.target.value,
              })
            }
            className="border rounded px-2 py-1 w-full mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="text-gray-600">Limited Seats:</label>
          <input
            type="number"
            value={editedRestaurant.limitedSeats}
            onChange={(e) =>
              setEditedRestaurant({
                ...editedRestaurant,
                limitedSeats: e.target.value,
              })
            }
            className="border rounded px-2 py-1 w-full mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="text-gray-600">Opening Hour:</label>
          <input
            type="time"
            value={editedRestaurant.hoursOfOperation.openingHour}
            onChange={(e) =>
              setEditedRestaurant({
                ...editedRestaurant,
                hoursOfOperation: {
                  ...editedRestaurant.hoursOfOperation,
                  openingHour: e.target.value,
                },
              })
            }
            className="border rounded px-2 py-1 w-full mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="text-gray-600">Closing Hour:</label>
          <input
            type="time"
            value={editedRestaurant.hoursOfOperation.closingHour}
            onChange={(e) =>
              setEditedRestaurant({
                ...editedRestaurant,
                hoursOfOperation: {
                  ...editedRestaurant.hoursOfOperation,
                  closingHour: e.target.value,
                },
              })
            }
            className="border rounded px-2 py-1 w-full mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />

          <button
            onClick={onSaveEdit}
            className="bg-green-500 text-white py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onCancelEdit}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-lg font-semibold">Email: {restaurant.email}</p>
          <p className="text-lg font-semibold">Phone: {restaurant.phone}</p>
          <p className="text-lg font-semibold">
            Limited Seats: {restaurant.limitedSeats}
          </p>
          <p className="text-lg font-semibold">
            Opening Hour: {formatTime(restaurant.hoursOfOperation.openingHour)}
          </p>
          <p className="text-lg font-semibold">
            Closing Hour: {formatTime(restaurant.hoursOfOperation.closingHour)}
          </p>
        </div>
      )}

      <TableList
        restaurantId={restaurantId}
        tables={tables}
        onTableDeleted={onTableDeleted}
      />
      <div className="flex items-center justify-center p-2">
        <AddTableForm onAddTable={onAddTable} />
      </div>
      <div className="mt-4">
        <ReservationList reservations={reservations} />
      </div>

      <div className="flex items-center justify-center space-x-4 p-4">
        <button
          onClick={onEditRestaurant}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
        >
          <span className="mr-2">
            <FaEdit />
          </span>
          Edit Restaurant
        </button>
        <button
          onClick={onDeleteRestaurant}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
        >
          <span className="mr-2">
            <FaTrash />
          </span>
          Delete Restaurant
        </button>
      </div>
    </div>
  );
};

export default RestaurantPage;
