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
    <div>
      <div className='flex items-center justify-between mb-4'>
        <Button variant='outline' onClick={() => navigate('/groups')}>
          <ArrowLeft className='mr-2 size-4' />
          Back to Groups
        </Button>
      </div>

      <ScrollArea className="h-[70vh] pr-4"> 
        <div className="space-y-6 pb-8">
          
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <h1 className='text-3xl font-bold mb-0'>{group.label}</h1>
              <Badge variant={getGroupTypeColor(group.type)}>{group.type}</Badge>
            </div>
            <p className='text-muted-foreground'>{group.description}</p>
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Group Name</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>{group.name}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-2'>
                  <Users className='size-5 text-muted-foreground' />
                  <p className='text-2xl font-bold'>{group.memberCount}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>{group.leader || 'None'}</p>
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
                <ScrollArea className="h-[35vh] pr-2">
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
                          <TableCell className="font-medium">{member.characterName}</TableCell>
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
            <CardContent className='space-y-4 text-sm'>
              <div className='flex justify-between border-b pb-2'>
                <span className='text-muted-foreground'>Type:</span>
                <Badge variant={getGroupTypeColor(group.type)}>{group.type}</Badge>
              </div>
              <div className='flex justify-between border-b pb-2'>
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
      </ScrollArea>
    </div>
  );
}
