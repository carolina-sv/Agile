'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Task, Status } from '@/types';
import { TEAM_MEMBERS } from '@/lib/data';
import { PlusCircle, GripVertical } from 'lucide-react';
import TaskCard from './task-card';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import TaskDetailsSheet from './task-details-sheet';

interface KanbanBoardProps {
  initialTasks: Task[];
}

const columns: Status[] = ['Backlog', 'To Do', 'In Progress', 'Done'];

export default function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const tasksByStatus = useMemo(() => {
    const grouped: Record<Status, Task[]> = {
      Backlog: [],
      'To Do': [],
      'In Progress': [],
      Done: [],
      Cancelled: [],
    };
    tasks.forEach((task) => {
      if (task.status in grouped) {
        grouped[task.status].push(task);
      }
    });
    return grouped;
  }, [tasks]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: Status) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status: newStatus } : task
      )
    );
    setDraggedTaskId(null);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  const getAssignee = (assigneeId: string | null) => {
    return TEAM_MEMBERS.find((m) => m.id === assigneeId);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((status) => (
          <Card
            key={status}
            className="h-full bg-card/60"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">{status}</CardTitle>
              <span className="text-sm font-bold text-muted-foreground">{tasksByStatus[status].length}</span>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-2">
                {tasksByStatus[status].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    assignee={getAssignee(task.assigneeId)}
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
              </div>
               <Button variant="ghost" className="w-full mt-2 justify-start text-sm text-muted-foreground">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add task
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <TaskDetailsSheet
        task={selectedTask}
        open={!!selectedTask}
        onOpenChange={(isOpen) => !isOpen && setSelectedTask(null)}
        onUpdateTask={handleTaskUpdate}
      />
    </>
  );
}
