'use server';

import { suggestTaskAssignee, type SuggestTaskAssigneeInput } from '@/ai/flows/ai-task-assigner';
import { TEAM_MEMBERS } from './data';
import { z } from 'zod';

const SuggestAssigneeActionState = z.object({
    suggestedAssignee: z.string().optional(),
    reasoning: z.string().optional(),
    error: z.string().optional(),
});

export type SuggestAssigneeState = z.infer<typeof SuggestAssigneeActionState>;

export async function suggestAssigneeAction(
  prevState: SuggestAssigneeState,
  formData: FormData
): Promise<SuggestAssigneeState> {
  const taskDescription = formData.get('taskDescription');
  if (typeof taskDescription !== 'string' || !taskDescription) {
    return { error: 'Task description is required.' };
  }

  try {
    const teamMemberSkills = TEAM_MEMBERS.reduce((acc, member) => {
      acc[member.name] = member.skills;
      return acc;
    }, {} as Record<string, string[]>);

    const teamMemberWorkload = TEAM_MEMBERS.reduce((acc, member) => {
      acc[member.name] = member.workload;
      return acc;
    }, {} as Record<string, number>);

    const input: SuggestTaskAssigneeInput = {
      taskDescription,
      teamMemberSkills,
      teamMemberWorkload,
    };

    const result = await suggestTaskAssignee(input);

    return {
      suggestedAssignee: result.suggestedAssignee,
      reasoning: result.reasoning,
    };
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to get suggestion: ${error}` };
  }
}
