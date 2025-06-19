import React, { useState } from 'react';
import { XIcon, EditIcon, CheckIcon, CalendarIcon } from 'lucide-react';
type Priority = 'low' | 'medium' | 'high';
interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority: Priority;
}
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(task.id, {
        text: editText,
        dueDate: editDueDate || undefined,
        priority: editPriority
      });
      setIsEditing(false);
    }
  };
  const priorityColors = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-yellow-100 text-yellow-600',
    high: 'bg-red-100 text-red-600'
  };
  if (isEditing) {
    return <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg shadow-sm">
        <input type="text" value={editText} onChange={e => setEditText(e.target.value)} className="flex-grow px-2 py-1 border rounded" autoFocus />
        <input type="date" value={editDueDate} onChange={e => setEditDueDate(e.target.value)} className="px-2 py-1 border rounded" />
        <select value={editPriority} onChange={e => setEditPriority(e.target.value as Priority)} className="px-2 py-1 border rounded">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="text-green-500 hover:text-green-700" aria-label="Save changes">
          <CheckIcon size={18} />
        </button>
      </form>;
  }
  return <li className="group flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500" />
      <div className="ml-3 flex-grow">
        <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.text}
        </span>
        <div className="flex items-center gap-2 mt-1">
          {task.dueDate && <span className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarIcon size={12} />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>}
          <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 focus:outline-none" aria-label="Edit task">
          <EditIcon size={18} />
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 focus:outline-none" aria-label="Delete task">
          <XIcon size={18} />
        </button>
      </div>
    </li>;
};
export default TaskItem;