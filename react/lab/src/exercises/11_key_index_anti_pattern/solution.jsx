// solution.jsx
import React, { useState } from 'react';

export function DynamicTodoList({ initialTodos = [] }) {
  const [todos, setTodos] = useState(initialTodos);

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} data-testid={"todo-item-" + todo.id}>
          <input defaultValue={todo.text} data-testid={"input-" + todo.id} />
          <button data-testid={"remove-" + todo.id} onClick={() => removeTodo(todo.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
