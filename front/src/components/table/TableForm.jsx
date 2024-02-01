import React, { useState } from 'react';

const TableForm = ({ restaurantId, onAddTable }) => {
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!capacity) {
      setError('Capacity is required');
      return;
    }

    try {
      // Send the table data to the server
      const response = await fetch(`/api/restaurant/${restaurantId}/add-table`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ capacity }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to add table');
        return;
      }

      // If the table is added successfully, clear the form and update the parent component
      setCapacity('');
      setError('');
      onAddTable();
    } catch (error) {
      console.error('Error adding table:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded">
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="capacity" 
        className="block text-sm font-medium text-gray-600">
          Capacity
        </label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Add Table
      </button>
    </form>
    </div>
  );
};

export default TableForm;
