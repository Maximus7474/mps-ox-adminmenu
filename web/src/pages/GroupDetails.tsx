import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { mockGroups } from '../utils/mock-data';
import { ScrollArea } from '../components/ui/scroll-area';

export function GroupDetails() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const group = mockGroups.find((g) => g.id === groupId);

  if (!group) {
    return (
      <div className='space-y-6'>
        <Button variant='outline' onClick={() => navigate('/groups')}>
          <ArrowLeft className='mr-2 size-4' />
          Back to Groups
        </Button>
        <Card>
          <CardContent className='py-12 text-center'>
            <p className='text-muted-foreground'>Group not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <Button variant='outline' onClick={() => navigate('/groups')}>
          <ArrowLeft className='mr-2 size-4' />
          Back to Groups
        </Button>
      </div>

      <div>
        <div className='flex items-center gap-2 mb-2'>
          <h1 className='mb-0'>{group.label}</h1>
          <Badge variant={getGroupTypeColor(group.type)}>{group.type}</Badge>
        </div>
        <p className='text-muted-foreground'>{group.description}</p>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Group Name</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl'>{group.name}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <Users className='size-5 text-muted-foreground' />
              <p className='text-2xl'>{group.memberCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leader</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl'>{group.leader || 'None'}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members List</CardTitle>
          <CardDescription>All members currently in this group</CardDescription>
        </CardHeader>
        <CardContent>
          {group.members.length > 0 ? (
            <ScrollArea className="h-[45vh]">
              <Table isScrollable>
                <TableHeader className='sticky top-0 bg-background'>
                  <TableRow>
                    <TableHead>Character</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Rank</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.members.map((member) => (
                    <TableRow key={member.characterId}>
                      <TableCell>{member.characterName}</TableCell>
                      <TableCell>{member.playerName}</TableCell>
                      <TableCell>
                        <Badge variant='outline'>{member.rank}</Badge>
                      </TableCell>
                      <TableCell>{member.joinedAt.toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className='py-12 text-center text-muted-foreground'>No members to display</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Group Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Type:</span>
            <Badge variant={getGroupTypeColor(group.type)}>{group.type}</Badge>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Created:</span>
            <span>{group.createdAt.toLocaleDateString()}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Total Members:</span>
            <span>{group.memberCount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
