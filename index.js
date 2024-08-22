import React ,{useState}from 'react';

import { render } from 'react-dom';


// TodoItem Component
const TodoItem = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="todo-item">
      <span>{todo.text}</span>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};
// Main App Component
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: newTodoText,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setNewTodoText(todo.text);
  };

  const handleUpdateTodo = () => {
    if (newTodoText.trim() === '' || !editingTodo) return;

    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodo.id ? { ...todo, text: newTodoText } : todo
    );

    setTodos(updatedTodos);
    setNewTodoText('');
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={editingTodo ? handleUpdateTodo : handleAddTodo}>
          {editingTodo ? 'Update' : 'Add'}
        </button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

  
render(<App />, document.getElementById('root'));
