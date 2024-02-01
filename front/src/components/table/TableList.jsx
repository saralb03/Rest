import React from 'react';
import { remove } from '../../api/api';
import { FaTrash } from "react-icons/fa";

const TableList = ({ tables, onTableDeleted }) => {
  const handleDeleteTable = async (tableId) => {
    try {
      const restaurantId = localStorage.getItem("restaurantId");
      console.log("rest"+restaurantId);
      // Call the deleteTable API function
      // await deleteTable(restaurantId, tableId);
      await remove(`delete-table/${restaurantId}/${tableId}`);
      // If successful, trigger the callback to update the UI
      onTableDeleted();
    } catch (error) {
      console.error('Error deleting table:', error.message);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
    <h2 className="text-2xl font-semibold mb-4">Tables</h2>
    <div className="flex flex-wrap -mx-2">
      {tables.map((table) => (
        <div key={table._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
          <div className="border rounded p-3 bg-white flex items-center justify-between">
            <div className="flex-grow">
              <p className="text-lg font-semibold">Table Number: {table.tableNumber}</p>
              <p>Capacity: {table.capacity}</p>
            </div>
            <FaTrash onClick={() => handleDeleteTable(table._id)} className="cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default TableList;
