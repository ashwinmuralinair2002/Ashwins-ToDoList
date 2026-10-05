import type { Todo } from '../types';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
};

function TodoList({ todos, onToggleComplete, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-secondary fs-5 my-5 p-4 bg-white rounded shadow-sm">
        No tasks available. Click <strong>+ Add Task</strong> to create one!
      </div>
    );
  }

  return (
    <div className="w-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;
