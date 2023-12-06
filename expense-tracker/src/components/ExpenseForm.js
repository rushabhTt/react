import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addExpense, removeExpense, setExpenses } from "../store/expenses";
import Table from "./Table";

function ExpenseForm() {
  const dispatch = useDispatch();
  // ^ pahle useState se manage kr rhe the ab redux se expenses ko
  const expenses = useSelector((state) => state.expenses.expenses);
  const showPremiumButton = useSelector(
    (state) => state.expenses.showPremiumButton
  );

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // const [expenses, setExpenses] = useState([]);
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
        dispatch(setExpenses(expensesArray));
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, [dispatch]);

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
        const updatedExpenses = expenses.map((item) =>
          item.id === editingExpense.id ? { ...item, ...newData } : item
        );
        dispatch(setExpenses(updatedExpenses));
        setEditingExpense(null);
      } else {
        await axios.post(
          "https://expensetracker-12365-default-rtdb.firebaseio.com/expense.json",
          newData
        );
        dispatch(setExpenses([...expenses, newData]));
      }
      setAmount("");
      setDescription("");
      setCategory("");
      // dispatch(addExpense(newData));
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

      const updatedExpenses = expenses.filter((item) => item.id !== expense.id);
      dispatch(setExpenses(updatedExpenses));
      
      console.log("Expense successfully deleted");
      dispatch(removeExpense(expense.id));
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

  const activatePremium = () => {};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      {showPremiumButton && (
        <button onClick={activatePremium}>Activate Premium</button>
      )}
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
      <Table expenses={expenses} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default ExpenseForm;
