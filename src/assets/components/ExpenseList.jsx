import React from 'react'

export default function ExpenseList({proexpenses,deleteExpenses,editExpenses}) {
  return (
    <div>ExpenseList
      {proexpenses.map((item) => (
        <div key={item.id}>
          {item.title} - {item.amount}
           <button onClick={()=>deleteExpenses(item_id)}>Delete</button>
           <button onClick={()=>editExpenses(item)}>Edit</button>
           
        </div>
      ))}
    </div>

  )
}