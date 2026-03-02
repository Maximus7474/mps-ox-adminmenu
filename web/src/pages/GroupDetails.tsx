import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Edit, Shield, Users } from 'lucide-react';
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
          <CardContent className='py-6 text-center'>
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
      <div className='flex items-center justify-between items-center border-b pb-2 mb-2'>
        <div className='flex gap-4 items-center justify-start items-center'>
          <Button variant='outline' onClick={() => navigate('/groups')}>
            <ArrowLeft className='size-4' />
          </Button>

          <div className='flex items-center gap-2'>
            <h1 className='text-3xl font-bold'>{group.label}</h1>
            <Badge variant={getGroupTypeColor(group.type)}>{group.type}</Badge>
          </div>
        </div>

        <Button variant="secondary" onClick={() => navigate(`/groups/${groupId}/edit`)}>
          <Edit className="mr-2 size-4" />
          Edit Group
        </Button>
      </div>

      <ScrollArea className="h-[70vh] pr-4"> 
        <div className="space-y-6 pt-2 pb-8">
          
          <div>
            <p className='text-foreground text-bold'>Description:</p>
            <p className='text-muted-foreground'>{group.description}</p>
          </div>

          <div className='grid gap-4 md:grid-cols-2 items-stretch'>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Group Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-around py-2">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                      <Users className="size-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Members</span>
                    </div>
                    <p className="text-3xl font-bold">{group.memberCount}</p>
                  </div>

                  <div className="h-12 w-px bg-border" />

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                      <Shield className="size-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Ranks</span>
                    </div>
                    <p className="text-3xl font-bold">{group.grades.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-dashed pb-2">
                  <span className="text-muted-foreground">Type</span>
                  <Badge variant={getGroupTypeColor(group.type)} className="capitalize">
                    {group.type}
                  </Badge>
                </div>
                <div className="flex justify-between items-center border-b border-dashed pb-2">
                  <span className="text-muted-foreground">Registry Name</span>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-xs font-semibold">
                    {group.name}
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Created On</span>
                  <span>{group.createdAt.toLocaleDateString()}</span>
                </div>
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
              <CardTitle>Grades</CardTitle>
              <CardDescription>
                Rank hierarchy and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Account Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.grades.map((grade, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{grade.label}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {grade.accountRole}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
