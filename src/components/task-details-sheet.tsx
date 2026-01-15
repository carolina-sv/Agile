'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import type { Task, TeamMember } from '@/types';
import { TEAM_MEMBERS } from '@/lib/data';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Calendar, User, Tag, MessageSquare, Paperclip } from 'lucide-react';
import AiTaskSuggester from './ai-task-suggester';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

interface TaskDetailsSheetProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTask: (updatedTask: Task) => void;
}

export default function TaskDetailsSheet({ task, open, onOpenChange, onUpdateTask }: TaskDetailsSheetProps) {
  if (!task) return null;

  const assignee = TEAM_MEMBERS.find((m) => m.id === task.assigneeId);
  const project = { name: "Project Name" }; // Placeholder

  const handleSuggestion = (suggestedAssigneeName: string) => {
    const newAssignee = TEAM_MEMBERS.find(m => m.name === suggestedAssigneeName);
    if(newAssignee) {
      const updatedTask = { ...task, assigneeId: newAssignee.id };
      onUpdateTask(updatedTask);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl w-full flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">{task.title}</SheetTitle>
          <SheetDescription>
            In project <span className="font-semibold text-primary">{project.name}</span>
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Assignee:</span>
                    {assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={assignee.avatarUrl} />
                            <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{assignee.name}</span>
                      </div>
                    ) : <span>Unassigned</span>}
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Due Date:</span>
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Badge variant="secondary">{task.status}</Badge>
                </div>
                 <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Priority:</span>
                    <Badge variant={task.priority === 'Urgent' ? 'destructive' : 'outline'}>{task.priority}</Badge>
                </div>
            </div>
            
            <AiTaskSuggester taskDescription={task.description} onApplySuggestion={handleSuggestion} />

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Comments</h3>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://picsum.photos/seed/4/100/100" />
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea placeholder="Add a comment..."/>
                      <div className="mt-2 flex justify-between items-center">
                         <Button variant="ghost" size="sm" className="text-muted-foreground"><Paperclip className="w-4 h-4 mr-2"/> Attach file</Button>
                         <Button>Comment</Button>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
