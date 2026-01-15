import PageLayout from '@/components/page-layout';
import ReportCharts from '@/components/report-charts';

export default function ReportsPage() {
  return (
    <PageLayout title="Reports">
      <div className="p-4 md:p-6">
        <ReportCharts />
      </div>
    </PageLayout>
  );
}
