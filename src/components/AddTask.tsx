import { useState } from 'react';
import type { Todo } from '../types';

type AddTaskProps = {
  isOpen: boolean;
  editingTodo: Todo | null;
  onOpenForm: () => void;
  onCloseForm: () => void;
  onAddTodo: (newTodo: { title: string; description: string; deadline: string }) => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
};

// Helper function to dynamically calculate today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function AddTask({
  isOpen,
  editingTodo,
  onOpenForm,
  onCloseForm,
  onAddTodo,
  onUpdateTodo,
}: AddTaskProps) {
  const [title, setTitle] = useState(editingTodo ? editingTodo.title : '');
  const [description, setDescription] = useState(editingTodo ? editingTodo.description : '');
  const [deadline, setDeadline] = useState(editingTodo ? editingTodo.deadline : '');

  const todayString = getTodayDateString();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // JavaScript validation: Title, Description, and Deadline are required
    if (!title.trim() || !description.trim() || !deadline.trim()) {
      alert('Please fill out all required fields: Title, Description, and Deadline.');
      return;
    }

    // Validation check: Deadline cannot be in the past
    if (deadline < todayString) {
      alert('Deadline cannot be before today.');
      return;
    }

    if (editingTodo) {
      onUpdateTodo({
        ...editingTodo,
        title: title.trim(),
        description: description.trim(),
        deadline: deadline.trim(),
      });
    } else {
      onAddTodo({
        title: title.trim(),
        description: description.trim(),
        deadline: deadline.trim(),
      });
    }
  };

  if (!isOpen) {
    return (
      <div className="mb-4 text-center">
        <button
          className="btn btn-primary px-4 py-2 fs-5 fw-semibold"
          onClick={onOpenForm}
        >
          + Add Task
        </button>
      </div>
    );
  }

  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="card-body p-4 bg-white rounded">
        <h4 className="card-title mb-3 fw-bold text-primary">
          {editingTodo ? 'Edit Task' : 'Add New Task'}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Task Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Description *</label>
            <textarea
              className="form-control"
              rows={2}
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Deadline *</label>
            <input
              type="date"
              className="form-control"
              value={deadline}
              min={todayString}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-secondary px-3"
              onClick={onCloseForm}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4">
              {editingTodo ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
