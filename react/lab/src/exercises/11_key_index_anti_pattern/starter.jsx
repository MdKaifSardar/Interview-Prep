// starter.jsx
import React, { useState } from 'react';

export function DynamicTodoList({ initialTodos = [] }) {
  const [todos, setTodos] = useState(initialTodos);

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        // BUG: key={index} ties DOM input state to position
        <li key={index} data-testid={"todo-item-" + todo.id}>
          <input defaultValue={todo.text} data-testid={"input-" + todo.id} />
          <button data-testid={"remove-" + todo.id} onClick={() => removeTodo(todo.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
