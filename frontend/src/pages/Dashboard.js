import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ auth, setAuth }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null); // Track expense being edited

  const authHeader = auth
    ? { Authorization: "Basic " + btoa(auth.username + ":" + auth.password) }
    : {};

  // Fetch expenses
  const fetchExpenses = async () => {
    if (!auth) return;
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", {
        headers: authHeader,
      });
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [auth]);

  // Add or Update expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth) return alert("Login first");

    try {
      if (editId) {
        // Update expense
        const res = await axios.put(
          `http://localhost:5000/api/expenses/${editId}`,
          { category, amount, comments },
          { headers: authHeader }
        );
        setExpenses(
          expenses.map((exp) => (exp._id === editId ? res.data : exp))
        );
        setEditId(null);
      } else {
        // Add new expense
        const res = await axios.post(
          "http://localhost:5000/api/expenses",
          { category, amount, comments },
          { headers: authHeader }
        );
        setExpenses([res.data, ...expenses]);
      }

      // Clear form
      setCategory("");
      setAmount("");
      setComments("");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save expense");
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    if (!auth) return alert("Login first");
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: authHeader,
      });
      setExpenses(expenses.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete expense");
    }
  };

  // Start editing
  const handleEdit = (exp) => {
    setEditId(exp._id);
    setCategory(exp.category);
    setAmount(exp.amount);
    setComments(exp.comments);
  };

  // Pie chart data
  const pieData = {
    labels: [...new Set(expenses.map((e) => e.category))],
    datasets: [
      {
        label: "Expenses by Category",
        data: [...new Set(expenses.map((e) => e.category))].map((cat) =>
          expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + Number(e.amount), 0)
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button className="logout-btn" onClick={() => setAuth(null)}>
        Logout
      </button>

      {/* Expense Form */}
      <h3>{editId ? "Edit Expense" : "Add Expense"}</h3>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setCategory("");
              setAmount("");
              setComments("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Expense Table */}
      <h3>Expenses</h3>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.category}</td>
              <td>{exp.amount}</td>
              <td>{exp.comments}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(exp)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(exp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart */}
      <h3>Category-wise Expenses</h3>
      {expenses.length > 0 && <Pie data={pieData} />}
    </div>
  );
}

export default Dashboard;
