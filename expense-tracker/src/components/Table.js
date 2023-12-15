import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function Table({ expenses, onDelete, onEdit }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses &&
              expenses.map((expense) => {
                console.log(expense.id); // Add this line for debugging
                return (
                  <tr
                    key={expense.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4">₹{expense.amount}</td>
                    <td className="px-6 py-4">{expense.description}</td>
                    <td className="px-6 py-4">
                      <button
                        className="ml-2 text-blue-500"
                        onClick={() => onEdit(expense)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="ml-2 text-red-500"
                        onClick={() => onDelete(expense)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;