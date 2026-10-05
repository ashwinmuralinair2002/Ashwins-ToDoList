import { useState } from 'react';
import type { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
};

function TodoItem({ todo, onToggleComplete, onDelete, onEdit }: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Helper to format date string (YYYY-MM-DD) into readable format like "October 6, 2026"
  const formatDeadline = (dateStr: string) => {
    if (!dateStr) return 'No deadline set';
    const [year, month, day] = dateStr.split('-');
    if (year && month && day) {
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return dateStr;
  };

  return (
    <div
      className={`mb-3 rounded bg-success text-white shadow-sm overflow-hidden ${
        todo.completed ? 'opacity-75' : ''
      }`}
    >
      {/* Main Row */}
      <div className="d-flex align-items-center justify-content-between p-3">
        <div
          className="d-flex align-items-center gap-3 flex-grow-1"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <input
            type="checkbox"
            className="form-check-input mt-0"
            style={{ width: '22px', height: '22px', cursor: 'pointer' }}
            checked={todo.completed}
            onChange={(e) => {
              e.stopPropagation();
              onToggleComplete(todo.id);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <span
            className={`fw-semibold fs-5 ${
              todo.completed ? 'text-decoration-line-through text-white-50' : ''
            }`}
          >
            {todo.title}
          </span>
          <small className="ms-2 opacity-75" style={{ fontSize: '0.8rem' }}>
            {isExpanded ? '▲' : '▼'}
          </small>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-warning btn-sm px-3 fw-bold"
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(todo);
            }}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-danger btn-sm px-3 fw-bold"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-top border-light border-opacity-25 bg-black bg-opacity-10 text-white text-start">
          <div className="mb-2">
            <strong>Description:</strong>
            <p className="mb-0 mt-1" style={{ whiteSpace: 'pre-wrap' }}>
              {todo.description || 'No description provided.'}
            </p>
          </div>
          <div>
            <strong>Deadline:</strong> {formatDeadline(todo.deadline)}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
