import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data: expensesData } = await axios.get(
          "https://expensetracker-12365-default-rtdb.firebaseio.com/expense.json"
        );
        const expensesArray = Object.entries(expensesData || {}).map(
          // * each element will be stored as id and ...data in the expensesArray
          ([firebaseKey, data]) => ({
            id: firebaseKey,
            ...data,
          })
        );
        setExpenses(expensesArray);
        console.log(expensesArray);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const newData = {
        amount: parseFloat(amount),
        description: description,
        category: category,
      };
      if (editingExpense) {
        await axios.put(
          `https://expensetracker-12365-default-rtdb.firebaseio.com/expense/${editingExpense.id}.json`,
          newData
        );
        setExpenses((prevExpenses) =>
          prevExpenses.map((item) =>
            item.id === editingExpense.id ? { ...item, ...newData } : item
          )
        );
        setEditingExpense(null);
      } else {
        await axios.post(
          "https://expensetracker-12365-default-rtdb.firebaseio.com/expense.json",
          newData
        );
        setExpenses((prevExpenses) => [...prevExpenses, newData]);
      }
      setAmount("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error submitting expense:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (expense) => {
    console.log("Deleting expense of id:", expense.id);
    try {
      await axios.delete(
        `https://expensetracker-12365-default-rtdb.firebaseio.com/expense/${expense.id}.json`
      );
      setExpenses((prevExpenses) =>
        prevExpenses.filter((item) => item.id !== expense.id)
      );
      console.log("Expense successfully deleted");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    try {
      setEditingExpense(expense);

      setAmount(expense.amount.toString());
      setDescription(expense.description);
      setCategory(expense.category);
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md"
          disabled={submitting}
        >
          Submit Expense
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Amount
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses &&
                expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {expense.category}
                    </td>
                    <td class="px-6 py-4">₹{expense.amount}</td>
                    <td class="px-6 py-4">{expense.description}</td>
                    <td class="px-6 py-4">
                      <button
                        className="ml-2 text-blue-500"
                        onClick={() => handleEdit(expense)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="ml-2 text-red-500"
                        onClick={() => handleDelete(expense)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExpenseForm;
