import { Users, Shield, Activity, UserCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { mockPlayers } from '../utils/mock-data';

export function Dashboard() {
  const onlinePlayers = mockPlayers.filter((p) => p.isOnline);
  const staffOnline = onlinePlayers.filter((p) => p.isStaff);
  const totalPlayers = mockPlayers.length;
  const totalStaff = mockPlayers.filter((p) => p.isStaff).length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='mb-2'>Dashboard</h1>
        <p className='text-muted-foreground'>Overview of current server activity</p>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>Online Players</CardTitle>
            <Activity className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>{onlinePlayers.length}</div>
            <p className='text-muted-foreground'>{totalPlayers} total registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>Staff Online</CardTitle>
            <Shield className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>{staffOnline.length}</div>
            <p className='text-muted-foreground'>{totalStaff} total staff members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>Active Characters</CardTitle>
            <UserCheck className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>{onlinePlayers.reduce((sum, p) => sum + p.characters.length, 0)}</div>
            <p className='text-muted-foreground'>characters in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>Total Users</CardTitle>
            <Users className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl'>{totalPlayers}</div>
            <p className='text-muted-foreground'>registered players</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Online Players */}
      <Card>
        <CardHeader>
          <CardTitle>Current Online Players</CardTitle>
          <CardDescription>Players currently connected to the server</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Active Character</TableHead>
                <TableHead>Job/Gang</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {onlinePlayers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className='text-center text-muted-foreground'>
                    No players online
                  </TableCell>
                </TableRow>
              ) : (
                onlinePlayers.map((player) => {
                  const activeChar = player.characters[0];
                  return (
                    <TableRow key={player.id}>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <div>
                            <div>{player.name}</div>
                            <div className='text-sm text-muted-foreground'>{player.steamId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{activeChar ? activeChar.name : 'None'}</TableCell>
                      <TableCell>
                        <div className='flex flex-col gap-1'>
                          {activeChar?.job && (
                            <Badge variant='outline' className='w-fit'>
                              {activeChar.job}
                            </Badge>
                          )}
                          {activeChar?.gang && (
                            <Badge variant='destructive' className='w-fit'>
                              {activeChar.gang}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <div className='size-2 rounded-full bg-green-500' />
                          <span className='text-sm'>Online</span>
                          {player.isStaff && (
                            <Badge variant='secondary' className='ml-2'>
                              <Shield className='mr-1 size-3' />
                              Staff
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
