import React, { useState } from 'react';
import { post } from '../../api/api';
import { MdFastfood } from "react-icons/md";

const AddTableForm = ({  onAddTable }) => {
  const [capacity, setCapacity] = useState('');
  const restaurantId = localStorage.getItem("restaurantId");
  const handleAddTable = async () => {
    try {
      // Validate input (you can add more validation if needed)
      if ( !capacity) {
        console.error('Table number and capacity are required.');
        return;
      }

      const data = {
        capacity: parseInt(capacity),
      };

      // Make a POST request to add the table
      const response = await post(data, `add-table/${restaurantId}`);

      // Check if the request was successful
      if (response.status === 200) {
        // Trigger the onTableAdded callback to inform the parent component
        onAddTable();
        // Clear input fields after successful addition
        setCapacity('');
      } else {
        console.error('Failed to add table:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding table:', error.message);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-gray-600">
        Capacity:
        <input
          type="number"
          className="border border-gray-300 rounded-md p-2"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </label>
      <button
        onClick={handleAddTable}
        className="bg-amber-700 text-white p-2 rounded-md flex items-center"
      >
        + Add Table 
        <MdFastfood />
      </button>
    </div>
  );
};

export default AddTableForm;
