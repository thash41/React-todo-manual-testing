import React, { useState } from 'react';
type Priority = 'low' | 'medium' | 'high';
interface TaskFormProps {
  onAddTask: (text: string, dueDate?: string, priority?: Priority) => void;
}
const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask
}) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text, dueDate || undefined, priority);
      setText('');
      setDueDate('');
      setPriority('medium');
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-3 mb-4">
      <div className="flex gap-2">
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Add a new task..." className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          Add
        </button>
      </div>
      <div className="flex gap-2">
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
    </form>;
};
export default TaskForm;