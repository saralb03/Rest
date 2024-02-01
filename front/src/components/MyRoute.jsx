import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import GetAvailableTables from './GetAvailableTables';
import RestDetails from './restaurant/RestDetails';
import RestaurantList from './restaurant/RestaurantList';
import { useParams } from 'react-router-dom';
import Login from './restaurant/login';
import RestaurantForm from './restaurant/RestaurantForm';
import RestaurantPage from './restaurant/RestaurantDetails';

export const MyRoute = () => {
  return (
    <Routes>
        
      <Route path="/" element={<RestaurantList />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<RestaurantForm/>}/>
      <Route path="/restaurant/:restaurantId" element={<RestDetails />} />
      {/* <Route path="/get-available-table" element={<GetAvailableTables />} /> */}
      <Route path="/restaurantOwner/:restaurantId" element={<RestaurantPage />} />
      <Route
        path="/restaurant/:restaurantId"
        element={<RestDetailsWrapper />} // Use a wrapper component
      />
    </Routes>
  );
};

const RestDetailsWrapper = () => {
  const { restaurantId } = useParams();

  return <RestDetails restaurantId={restaurantId} />;
};
