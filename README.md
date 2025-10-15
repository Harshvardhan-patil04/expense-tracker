# 💰 Full Stack Expense Tracker

A **Full Stack Expense Tracker** web application that allows users to manage and visualize their daily expenses efficiently.  
It includes **user authentication**, **CRUD operations for expenses**, and a **category-wise expense distribution pie chart** for data visualization.

---

## 🚀 Project Overview

This project helps users record, view, edit, and delete their expenses while keeping their data secure through authentication.  
It also provides insightful visualization through a **pie chart**, allowing users to understand their spending habits across categories.

---

## 🎯 Features

### 🔐 Authentication
- **Sign Up:** Create a new user account.  
- **Login:** Secure login using **Basic Authentication**.  
- **Session Management:** User sessions are maintained to prevent unauthorized access.  

### 💵 Expense Management
- **Add Expense:**  
  - Fields: *Category, Amount, Comments*  
  - Adds a new expense entry for the logged-in user.  
- **View Expenses:**  
  - Displays all expenses in a **sortable table** format.  
  - Columns: *Category, Amount, Created At, Updated At, Comments*  
  - Sorted by the most recently added expense.  
- **Edit Expense:**  
  - Modify existing expense details.  
- **Delete Expense:**  
  - Remove an expense record from the database.

### 📊 Data Visualization
- **Pie Chart View:**  
  - Shows **category-wise expense distribution** using an interactive pie chart.  
  - Helps users track and analyze their spending patterns.

---

## 🧠 Tech Stack

### 🖥️ Frontend
- React.js  
- Axios for API calls  
- Chart.js for pie chart visualization  
- Bootstrap / Tailwind CSS for styling

### ⚙️ Backend
- Node.js with Express.js  
- RESTful API architecture  

### 🗄️ Database
- MongoDB for data storage  

## 🧩 System Modules

| Module | Description |
|--------|-------------|
| **Authentication** | Sign Up and Login system using Basic Authentication |
| **Expense Management** | Add, View, Edit, Delete expenses |
| **Visualization** | Display category-wise spending in a Pie Chart |
| **Database** | Store user and expense data securely |

---

## ⚙️ Installation & Setup Guide

### 1. Clone the Repository

git clone https://github.com/harshvardhan-patil04/expense-tracker.git
cd expense-tracker

2. Backend Setup
bash
Copy code
cd backend
npm install

Configure the .env file with:
env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=expense_tracker
PORT=5000

Run backend:
npm start

3. Frontend Setup

cd frontend
npm install
npm start

4. Database Setup
Create a MongoDB database named expense_tracker.


📊 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/signup	Create new user
POST	/api/login	Authenticate user

💵 Expenses
Method	Endpoint	Description
POST	/api/expenses	Add new expense
GET	/api/expenses	Get all expenses
PUT	/api/expenses/:id	Edit expense by ID
DELETE	/api/expenses/:id	Delete expense by ID

📊 Data Visualization
Library Used: Chart.js

Purpose: Displays expenses by category in a colorful, interactive pie chart.

Example:
Food: 30%
Travel: 20%
Entertainment: 25%
Others: 25%

🧪 Testing
Ensure backend is running before frontend.
Test API routes using Postman or Insomnia.
Check login/signup flow and expense operations.

📁 Project Structure
expense-tracker/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
