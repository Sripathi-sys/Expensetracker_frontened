import { useEffect, useState } from 'react';
import ExpenseForm from './ExpenseForm';
import { v4 as uid } from "uuid";
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import axios from 'axios';

export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/")
      .then((response) => {
        setExpenses(response.data.map(exp => ({
          id: exp._id,
          title: exp.title,
          amount: exp.amount
        })));
      })
      .catch((error) => {
        console.error("Axios fetch error:", error.message);
      });
  }, []);

 const addExpense = (title, amount, id) => {
  if (id) {
    const updated = expenses.map((e) =>
      e.id === id ? { ...e, title, amount: Number(amount) } : e
    );
    setExpenses(updated);
  } else {
    axios.post("https://expensetracker-backend-99vu.onrender.com/api/postdata/", {
      title,
      amount: Number(amount)
    })
    .then((res) => {
      const newExpense = {
        id: res.data._id,
        title: res.data.title,
        amount: res.data.amount
      };
      setExpenses([...expenses, newExpense]);
    })
    .catch((err) => console.error("Add error:", err));
  }
};


const deleteExpense = (id) => {
  axios.delete(`https://expensestracker-backend-99vu.onrender.com/api/${id}`)
    .then(() => {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }); // closes .then()
}; // closes deleteExpense function


  const editExpenses = (expense) => {
    setItemToEdit(expense);
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <ExpenseForm addExpense={addExpense} itemToEdit={itemToEdit} />
      <ExpenseList
        proexpenses={expenses}
        deleteExpenses={deleteExpense}
        editExpenses={editExpenses}
      />
      <ExpenseSummary proexpenses={expenses} />
    </div>
  );
}


