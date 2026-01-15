'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting the best team member to assign to a task.
 *
 * - suggestTaskAssignee - A function that handles the task assignee suggestion process.
 * - SuggestTaskAssigneeInput - The input type for the suggestTaskAssignee function.
 * - SuggestTaskAssigneeOutput - The return type for the suggestTaskAssignee function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskAssigneeInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task to be assigned.'),
  teamMemberSkills: z.record(z.array(z.string())).describe('A record of team members and their skills. Key is team member name, value is array of their skills.'),
  teamMemberWorkload: z.record(z.number()).describe('A record of team members and their current workload. Key is team member name, value is their current workload (0-100).'),
  pastAssignments: z.array(z.object({
    taskDescription: z.string(),
    assignee: z.string(),
    success: z.boolean(),
  })).optional().describe('A list of past task assignments, including task descriptions, assignees, and whether the assignment was successful.'),
});

export type SuggestTaskAssigneeInput = z.infer<typeof SuggestTaskAssigneeInputSchema>;

const SuggestTaskAssigneeOutputSchema = z.object({
  suggestedAssignee: z.string().describe('The name of the team member who is suggested to be assigned to the task.'),
  reasoning: z.string().describe('The reasoning behind the assignee suggestion, considering skills, workload, and past performance.'),
});

export type SuggestTaskAssigneeOutput = z.infer<typeof SuggestTaskAssigneeOutputSchema>;


const getPastAssignments = ai.defineTool({
  name: 'getPastAssignments',
  description: 'Retrieves past task assignments for a given task description.',
  inputSchema: z.object({
    taskDescription: z.string().describe('The description of the task.'),
  }),
  outputSchema: z.array(z.object({
    assignee: z.string(),
    success: z.boolean(),
  })),
}, async (input) => {
  // In a real application, this would fetch past assignments from a database
  // based on the task description.
  // For this example, we return an empty array.
  return [];
});

export async function suggestTaskAssignee(input: SuggestTaskAssigneeInput): Promise<SuggestTaskAssigneeOutput> {
  return suggestTaskAssigneeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskAssigneePrompt',
  input: {schema: SuggestTaskAssigneeInputSchema},
  output: {schema: SuggestTaskAssigneeOutputSchema},
  tools: [getPastAssignments],
  prompt: `You are an AI assistant helping project managers assign tasks to team members.

  Consider the following information when suggesting an assignee:

  Task Description: {{{taskDescription}}}
  Team Member Skills: {{JSON teamMemberSkills}}
  Team Member Workload: {{JSON teamMemberWorkload}}

  {% if pastAssignments %}
  Past Assignments:
  {{#each pastAssignments}}
  - Task: {{taskDescription}}, Assignee: {{assignee}}, Success: {{success}}
  {{/each}}
  {% else %}
  No past assignments available.
  {% endif %}

  Analyze the task description, team member skills, and workload to determine the best assignee.
  Consider past assignments and their success rates when making your decision.

  Prioritize team members with the necessary skills and lower workloads.
  Explain your reasoning for suggesting the chosen assignee.

  Output the suggested assignee and your reasoning in the format specified by the SuggestTaskAssigneeOutputSchema schema description.
`,
});

const suggestTaskAssigneeFlow = ai.defineFlow(
  {
    name: 'suggestTaskAssigneeFlow',
    inputSchema: SuggestTaskAssigneeInputSchema,
    outputSchema: SuggestTaskAssigneeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
