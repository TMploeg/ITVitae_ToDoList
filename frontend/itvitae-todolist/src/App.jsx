import React, { useState } from 'react'
import ToDoList from './components/todolist/ToDoList';
import "./App.css"

export default function App() {
  return (
    <div className='todo-container'>
      <ToDoList />
    </div>
  )
}
