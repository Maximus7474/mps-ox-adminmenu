import { Users, Shield, Activity, ShieldEllipsis } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { ScrollArea } from '../../components/ui/scroll-area';
import { fetchNui } from '../../utils/fetchNui';
import { DashboardData } from '@common/types';
import { useState } from 'react';

const mockData: DashboardData = {
  playerCount: {
    total: 10,
    online: 5,
  },
  staffCount: {
    total: 2,
    online: 2,
  },
  playerlist: [
    {
      source: '1',
      username: 'username 1',
      userId: 1,
      isStaff: true,
      activeCharacter: {
        charId: 1,
        stateId: 'ABC12345',
        name: 'John Doe',
        groups: ['police', 'staff', 'donator'],
      },
    },
    {
      source: '2',
      username: 'username 2',
      userId: 2,
      isStaff: false,
      activeCharacter: {
        charId: 2,
        stateId: 'XYZ98765',
        name: 'Jane Smith',
        groups: ['unemployed'],
      },
    },
    {
      source: '3',
      username: 'username 3',
      userId: 3,
      isStaff: false,
      activeCharacter: undefined,
    },
  ],
};

export function Dashboard() {
  const [dashboardData, setDashBoardData] = useState<DashboardData>();

  fetchNui<DashboardData>('dashboardData', { action: 'subscribe' }, { data: mockData })
  .then(setDashBoardData);

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='mb-2'>Dashboard</h1>
        <p className='text-muted-foreground'>Overview of current server activity</p>
      </div>

      <div className='grid gap-4 grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>Staff Online</CardTitle>
            <Shield className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>{dashboardData?.staffCount.online}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>Online Players</CardTitle>
            <Activity className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>{dashboardData?.playerCount.online}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>Total Users</CardTitle>
            <Users className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>{dashboardData?.playerCount.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>Total Staff</CardTitle>
            <ShieldEllipsis className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>{dashboardData?.staffCount.total}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Online Players</CardTitle>
          <CardDescription>Players currently connected to the server</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[32vh]'>
            <Table isScrollable>
              <TableHeader className='sticky top-0 bg-background'>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Active Character</TableHead>
                  <TableHead>Groups</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData?.playerlist.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className='text-center text-muted-foreground'>
                      No players online
                    </TableCell>
                  </TableRow>
                ) : (
                  dashboardData?.playerlist.map((player) => {
                    return (
                      <TableRow key={player.source}>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <div>
                              <div>{player.username}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{player.activeCharacter ? player.activeCharacter.name : ''}</TableCell>
                        <TableCell>
                          <div className='flex flex-row gap-1'>
                            {player.activeCharacter &&
                              player.activeCharacter.groups.slice(0, 1).map((g) => (
                                <Badge key={g} variant='outline' className='w-fit text-[10px]'>
                                  {g}
                                </Badge>
                              ))}
                            {player.activeCharacter && player.activeCharacter.groups.length > 1 && (
                              <Badge variant='secondary' className='w-fit text-[10px]'>
                                +{player.activeCharacter.groups.length - 1} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <div className='size-2 rounded-full bg-green-500' />
                            <span className='text-sm'>Online</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {player.isStaff && (
                            <Badge variant='secondary' className='ml-2'>
                              <Shield className='mr-1 size-3' />
                              Staff
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
