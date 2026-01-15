'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { suggestAssigneeAction, type SuggestAssigneeState } from '@/lib/actions';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Wand2, UserCheck, Loader2, Lightbulb } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AiTaskSuggesterProps {
  taskDescription: string;
  onApplySuggestion: (assigneeName: string) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting suggestion...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Suggest Assignee
        </>
      )}
    </Button>
  );
}

export default function AiTaskSuggester({ taskDescription, onApplySuggestion }: AiTaskSuggesterProps) {
  const initialState: SuggestAssigneeState = {};
  const [state, formAction] = useFormState(suggestAssigneeAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'AI Suggestion Failed',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  const handleApply = () => {
    if (state.suggestedAssignee) {
      onApplySuggestion(state.suggestedAssignee);
      toast({
        title: 'Assignee Updated',
        description: `${state.suggestedAssignee} has been assigned to the task.`,
      })
    }
  };

  return (
    <div>
      <form action={formAction}>
        <input type="hidden" name="taskDescription" value={taskDescription} />
        <SubmitButton />
      </form>

      {state.suggestedAssignee && (
        <Alert className="mt-4 bg-primary/10 border-primary/50">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle className="font-bold">AI Suggestion</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              <strong className="text-primary">{state.suggestedAssignee}</strong> is the best fit for this task.
            </p>
            <p className="text-xs italic text-muted-foreground mb-3">
              "{state.reasoning}"
            </p>
            <Button size="sm" onClick={handleApply}>
              <UserCheck className="mr-2 h-4 w-4" />
              Apply Suggestion
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
