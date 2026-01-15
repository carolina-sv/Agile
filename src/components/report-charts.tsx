'use client';

import { TASKS, TEAM_MEMBERS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { Status } from '@/types';

const statusOrder: Status[] = ['Backlog', 'To Do', 'In Progress', 'Done', 'Cancelled'];

export default function ReportCharts() {
  const tasksByStatus = statusOrder.map(status => ({
    status,
    count: TASKS.filter(task => task.status === status).length,
    fill: `var(--color-${status.toLowerCase().replace(' ', '')})`,
  }));

  const teamWorkload = TEAM_MEMBERS.map(member => ({
    name: member.name.split(' ')[0],
    workload: member.workload,
    fill: 'var(--color-workload)',
  }));

  const chartConfigByStatus = {
    count: { label: 'Tasks' },
    backlog: { label: 'Backlog', color: 'hsl(var(--chart-5))' },
    todo: { label: 'To Do', color: 'hsl(var(--chart-4))' },
    inprogress: { label: 'In Progress', color: 'hsl(var(--chart-1))' },
    done: { label: 'Done', color: 'hsl(var(--chart-2))' },
    cancelled: { label: 'Cancelled', color: 'hsl(var(--muted))' },
  };

  const chartConfigWorkload = {
    workload: { label: 'Workload', color: 'hsl(var(--chart-1))' },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Tasks by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigByStatus} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={tasksByStatus}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={5}
                />
                <ChartLegend content={<ChartLegendContent nameKey="status" />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Team Workload (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigWorkload} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={teamWorkload}>
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="workload" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
