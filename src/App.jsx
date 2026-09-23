import { useState } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    date: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value
    }))
  }

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount && newExpense.date) {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense])
      setNewExpense({ title: '', amount: '', date: '' })
    }
  }
  const handleDeleteExpense = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index))
  }
  const handleEditExpense = (index, updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense, i) => (i === index ? updatedExpense : expense))
    )
  }

  return (
    <>
      <h1>Expense Tracker</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleAddExpense()
      }}>
        Expense: <input
          type="text"
          name="title"
          placeholder="Title"
          value={newExpense.title}
          onChange={handleInputChange}
        />
        <br />
        Amount: <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={handleInputChange}
        />
        <br />
        Date: <input
          type="date"
          name="date"
          placeholder="Date"
          value={newExpense.date}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.title} - ${expense.amount} - {expense.date}
            <button onClick={() => handleDeleteExpense(index)}>Delete</button>
            <button
              onClick={() =>
                handleEditExpense(index, {
                  ...expense,
                  title: prompt('Enter new title:', expense.title) || expense.title,
                  amount: prompt('Enter new amount:', expense.amount) || expense.amount,
                  date: prompt('Enter new date:', expense.date) || expense.date
                })
              }
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
