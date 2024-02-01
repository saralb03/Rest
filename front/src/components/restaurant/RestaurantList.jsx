import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get } from "../../api/api";

const RestaurantList = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await get("restaurants");
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const isRestaurantOpen = (restaurant) => {
    const now = new Date();
    const openingHour = new Date(restaurant.hoursOfOperation.openingHour);
    const closingHour = new Date(restaurant.hoursOfOperation.closingHour);

    return (
      now.getHours() >= openingHour.getHours() &&
      now.getHours() <= closingHour.getHours()
    );
  };

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Restaurant List</h1> */}
      <div className="mb-4">
        <input
          type="text"
          name="q"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border h-12 shadow-2xl p-4 rounded-full"
          placeholder="Search restaurants..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="border rounded overflow-hidden bg-white"
          >
            <img
              src={restaurant.img_url}
              alt={restaurant.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <Link
                to={`/restaurant/${restaurant._id}`}
                className="text-xl font-bold hover:underline"
                style={{ color: "#fdba74" }}
                onClick={() => navigate(`/restaurant/${restaurant._id}`)}
              >
                {restaurant.name}
              </Link>
              <p className="text-gray-600 mb-2">{restaurant.address}</p>
              <p
                className={`text-${
                  isRestaurantOpen(restaurant) ? "green" : "red"
                }-500`}
              >
                {isRestaurantOpen(restaurant) ? "Open" : "Closed"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
