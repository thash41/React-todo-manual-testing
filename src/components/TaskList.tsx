import React from 'react';
import TaskItem from './TaskItem';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
type Priority = 'low' | 'medium' | 'high';
interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority: Priority;
}
interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, updates: Partial<Task>) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onReorder
}) => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));
  const handleDragEnd = (event: any) => {
    const {
      active,
      over
    } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  };
  if (tasks.length === 0) {
    return <div className="text-center py-8 text-gray-500">
        No tasks to display. Add some tasks to get started!
      </div>;
  }
  return <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <ul className="mt-4 space-y-2">
          {tasks.map(task => <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} onEdit={onEditTask} />)}
        </ul>
      </SortableContext>
    </DndContext>;
};
export default TaskList;