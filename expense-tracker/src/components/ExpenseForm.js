import React, { useState, useEffect } from "react";
import axios from "axios";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch expenses from the backend when the component mounts
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/get-expenses"
        );
        // Assuming the response.data is an array of expenses
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(amount, description, category);
    try {
      setSubmitting(true);
      // You can replace the following URL with your backend endpoint to handle expense submissions
      const response = await axios.post(
        "https://your-backend-api.com/submit-expense",
        {
          amount: parseFloat(amount),
          description: description,
          category: category,
        }
      );
      console.log("Expense submitted successfully:", response.data);
      // Update the list of expenses after successful submission
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      // Clear the form after successful submission
      setAmount("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error submitting expense:", error);
    } finally {
      setSubmitting(false);
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
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <strong>{expense.category}</strong>: ${expense.amount} -{" "}
              {expense.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseForm;
