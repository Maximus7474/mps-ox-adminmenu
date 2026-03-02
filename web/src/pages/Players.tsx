import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Ban, AlertTriangle, Shield, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockPlayers } from '../utils/mock-data';
import { ScrollArea } from '../components/ui/scroll-area';

export function Players() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredPlayers = mockPlayers.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.steamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.characters.some((char) => char.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === 'online') return matchesSearch && player.isOnline;
    if (activeTab === 'staff') return matchesSearch && player.isStaff;
    if (activeTab === 'banned') return matchesSearch && player.bans.some((b) => b.isActive);
    return matchesSearch;
  });

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='mb-2'>Player Management</h1>
        <p className='text-muted-foreground'>Search players, manage bans, sanctions, and player notes</p>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-2 flex-1 max-w-md'>
          <Search className='size-4 text-muted-foreground' />
          <Input
            placeholder='Search by name, steam ID, or character...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='online'>Online</TabsTrigger>
            <TabsTrigger value='staff'>Staff</TabsTrigger>
            <TabsTrigger value='banned'>Banned</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Players Table */}
      <Card>
        <CardHeader>
          <CardTitle>Players</CardTitle>
          <CardDescription>
            {filteredPlayers.length} player{filteredPlayers.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[45vh]">
            <Table isScrollable>
              <TableHeader className='sticky top-0 bg-background'>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id} className='cursor-pointer' onClick={() => navigate(`/players/${player.id}`)}>
                    <TableCell>
                      <div>
                        <div className='flex items-center gap-2'>
                          {player.name}
                          {player.isStaff && (
                            <Badge variant='secondary'>
                              <Shield className='mr-1 size-3' />
                              Staff
                            </Badge>
                          )}
                        </div>
                        <div className='text-sm text-muted-foreground'>{player.steamId}</div>
                        <div className='text-sm text-muted-foreground'>
                          {player.characters.length} character{player.characters.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-col gap-1'>
                        {player.isOnline && (
                          <Badge variant='outline' className='w-fit'>
                            <div className='mr-1 size-2 rounded-full bg-green-500' />
                            Online
                          </Badge>
                        )}
                        {player.bans.some((b) => b.isActive) && (
                          <Badge variant='destructive' className='w-fit'>
                            <Ban className='mr-1 size-3' />
                            Banned
                          </Badge>
                        )}
                        {player.sanctions.length > 0 && (
                          <Badge variant='secondary' className='w-fit'>
                            <AlertTriangle className='mr-1 size-3' />
                            {player.sanctions.length} Sanction{player.sanctions.length !== 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/players/${player.id}`);
                        }}
                      >
                        View Details
                        <ChevronRight className='ml-2 size-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
