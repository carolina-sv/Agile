import PageLayout from '@/components/page-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PROJECTS, TEAM_MEMBERS } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <PageLayout title="Projects">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Projects</h2>
            <Button>Create Project</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <div className="flex -space-x-2">
                  {project.teamIds.map(id => {
                    const member = TEAM_MEMBERS.find(m => m.id === id);
                    if (!member) return null;
                    return (
                        <Avatar key={id} className="border-2 border-card">
                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    )
                  })}
                </div>
                <Link href="/" passHref>
                    <Button variant="outline">View Board</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
