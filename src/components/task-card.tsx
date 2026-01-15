import type { Task, TeamMember, Priority } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GripVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  assignee: TeamMember | undefined;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

const priorityVariant: Record<Priority, 'destructive' | 'secondary' | 'outline' | 'default'> = {
  Urgent: 'destructive',
  High: 'secondary',
  Medium: 'outline',
  Low: 'default',
};

const priorityColor: Record<Priority, string> = {
    Urgent: 'border-red-500',
    High: 'border-yellow-500',
    Medium: 'border-blue-500',
    Low: 'border-gray-400',
}

export default function TaskCard({ task, assignee, onDragStart, onClick }: TaskCardProps) {
  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={`cursor-pointer hover:shadow-lg transition-shadow border-l-4 ${priorityColor[task.priority]}`}
    >
      <CardContent className="p-3 flex flex-col gap-2">
        <div className="flex items-start justify-between">
           <p className="font-semibold text-sm leading-snug pr-4">{task.title}</p>
           <div className="handle cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
             <GripVertical className="w-4 h-4" />
           </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant={priorityVariant[task.priority]} className="capitalize">
            {task.priority}
          </Badge>
          {assignee && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                    <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{assignee.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
