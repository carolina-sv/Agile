import PageLayout from '@/components/page-layout';
import KanbanBoard from '@/components/kanban-board';
import { TASKS } from '@/lib/data';

export default function Home() {
  return (
    <PageLayout title="Kanban Board">
      <div className="p-4 md:p-6">
        <KanbanBoard initialTasks={TASKS} />
      </div>
    </PageLayout>
  );
}
