import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Users, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { mockGroups } from '../utils/mock-data';
import { ScrollArea } from '../components/ui/scroll-area';

export function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getGroupTypeColor = (type: string) => {
    switch (type) {
      case 'gang':
        return 'destructive';
      case 'job':
        return 'default';
      case 'organization':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='mb-2'>Groups Management</h1>
          <p className='text-muted-foreground'>Manage server groups, jobs, and gangs</p>
        </div>
        <Button onClick={() => navigate('/groups/new')}>
          <Plus className='mr-2 size-4' />
          Create Group
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <Search className='size-4 text-muted-foreground' />
        <Input
          placeholder='Search groups...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-sm'
        />
      </div>

      <ScrollArea className='h-[58vh] pr-3'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              className='cursor-pointer transition-colors hover:bg-accent flex flex-col h-full gap-2'
              onClick={() => navigate(`/groups/${group.id}`)}
            >
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <CardTitle>{group.label}</CardTitle>
                    <CardDescription className='mt-1'>{group.name}</CardDescription>
                  </div>
                  <Badge variant={getGroupTypeColor(group.type)}>{group.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className='flex-1'>
                <p className='mb-4 text-sm text-muted-foreground'>{group.description}</p>
              </CardContent>
              <CardFooter className='flex flex-col items-start bottom-0'>
                <div className='flex items-center gap-2 text-sm'>
                  <Users className='size-4 text-muted-foreground' />
                  <span>{group.memberCount} members</span>
                </div>
                {group.leader && <div className='mt-2 text-sm text-muted-foreground'>Leader: {group.leader}</div>}
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
