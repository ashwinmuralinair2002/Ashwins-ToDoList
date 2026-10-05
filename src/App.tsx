import { useState, useEffect } from 'react';
import type { Todo } from './types';
import Header from './components/Header';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';

// Helper function to get today's local date in YYYY-MM-DD format using local time (e.g. IST)
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // 1. useEffect for loading saved todos from LocalStorage when the app starts
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos: Todo[] = JSON.parse(savedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        }
      } catch (error) {
        console.error('Failed to parse saved todos from LocalStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. useEffect for saving todos to LocalStorage whenever the todo state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // Calculate overdue tasks count (unfinished tasks with deadline before today)
  const todayStr = getTodayDateString();
  const overdueCount = todos.filter(
    (todo) => !todo.completed && todo.deadline && todo.deadline < todayStr
  ).length;

  // Handle opening the form for adding a new task
  const handleOpenAddForm = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  // Handle closing the form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  // Add a new todo item to state
  const handleAddTodo = (newTodoData: { title: string; description: string; deadline: string }) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTodoData.title,
      description: newTodoData.description,
      deadline: newTodoData.deadline,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setIsFormOpen(false);
  };

  // Delete a todo item from state
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Toggle completed status of a todo item
  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Handle opening the form to edit an existing task
  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  // Update an existing todo item in state
  const handleUpdateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
    setIsFormOpen(false);
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-5">
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <Header />

        {/* Overdue Tasks Notification Banner */}
        {overdueCount > 0 && (
          <div className="alert alert-warning text-center fw-bold shadow-sm mb-4" role="alert">
            ⚠️ You have {overdueCount} overdue task{overdueCount > 1 ? 's' : ''}.
          </div>
        )}

        <AddTask
          key={editingTodo ? editingTodo.id : isFormOpen ? 'open-add' : 'closed'}
          isOpen={isFormOpen}
          editingTodo={editingTodo}
          onOpenForm={handleOpenAddForm}
          onCloseForm={handleCloseForm}
          onAddTodo={handleAddTodo}
          onUpdateTodo={handleUpdateTodo}
        />

        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
          onEdit={handleEditClick}
        />
      </div>
    </div>
  );
}

export default App;
