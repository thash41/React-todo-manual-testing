import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import { Toaster, toast } from 'sonner';
type Priority = 'low' | 'medium' | 'high';
type Task = {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority: Priority;
};
type FilterType = 'all' | 'active' | 'completed';
export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (text: string, dueDate?: string, priority: Priority = 'medium') => {
    if (text.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text,
        completed: false,
        dueDate,
        priority
      };
      setTasks([...tasks, newTask]);
      toast.success('Task added successfully');
    }
  };
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? {
      ...task,
      completed: !task.completed
    } : task));
    toast.success('Task status updated');
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task deleted');
  };
  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? {
      ...task,
      ...updates
    } : task));
    toast.success('Task updated');
  };
  const reorderTasks = (startIndex: number, endIndex: number) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTasks(result);
  };
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  return <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Interactive To-Do List
        </h1>
        <TaskForm onAddTask={addTask} />
        <FilterButtons filter={filter} onFilterChange={setFilter} />
        <TaskList tasks={filteredTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} onEditTask={editTask} onReorder={reorderTasks} />
        <div className="mt-4 text-sm text-gray-500 text-center">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''} total •{' '}
          {tasks.filter(t => !t.completed).length} remaining
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>;
}
export default App;