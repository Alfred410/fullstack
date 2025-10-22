import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodo = async () => {
    const res = await fetch(`/todos`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await fetch(`/todos`, {
      method: "POST",
      headers: { "Content-Type": "appication/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo("");
    fetchTodo();
  };

  const toggleTodo = async (id, completed) => {
    await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "appication/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodo();
  };

  const deleteTodo = async (id) => {
    await fetch(`/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodo();
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <div className="bg-white text-black">
        <h1 className="text-black">ToDo List</h1>

        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add task"
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo, todoIndex) => (
            <li key={todoIndex}>
              {todo}
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                />
              </div>
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
