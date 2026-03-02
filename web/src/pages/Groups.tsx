import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Users, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { mockGroups } from '../utils/mock-data';
import { Group } from '../types';

export function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    type: 'job' as 'gang' | 'job' | 'organization',
    label: '',
    description: '',
  });

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateGroup = () => {
    const group: Group = {
      id: `g${groups.length + 1}`,
      ...newGroup,
      memberCount: 0,
      members: [],
      createdAt: new Date(),
    };
    setGroups([...groups, group]);
    setIsCreateDialogOpen(false);
    setNewGroup({ name: '', type: 'job', label: '', description: '' });
  };

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
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 size-4' />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>Add a new group, job, or gang to the server</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <Label htmlFor='group-name'>Name</Label>
                <Input
                  id='group-name'
                  placeholder='e.g., police'
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='group-label'>Label</Label>
                <Input
                  id='group-label'
                  placeholder='e.g., Los Santos Police Department'
                  value={newGroup.label}
                  onChange={(e) => setNewGroup({ ...newGroup, label: e.target.value })}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='group-type'>Type</Label>
                <Select
                  value={newGroup.type}
                  onValueChange={(value: 'gang' | 'job' | 'organization') => setNewGroup({ ...newGroup, type: value })}
                >
                  <SelectTrigger id='group-type'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='job'>Job</SelectItem>
                    <SelectItem value='gang'>Gang</SelectItem>
                    <SelectItem value='organization'>Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='group-description'>Description</Label>
                <Textarea
                  id='group-description'
                  placeholder='Brief description of the group'
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className='flex items-center gap-2'>
        <Search className='size-4 text-muted-foreground' />
        <Input
          placeholder='Search groups...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-sm'
        />
      </div>

      {/* Groups Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filteredGroups.map((group) => (
          <Card
            key={group.id}
            className='cursor-pointer transition-colors hover:bg-accent'
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
            <CardContent>
              <p className='mb-4 text-sm text-muted-foreground'>{group.description}</p>
              <div className='flex items-center gap-2 text-sm'>
                <Users className='size-4 text-muted-foreground' />
                <span>{group.memberCount} members</span>
              </div>
              {group.leader && <div className='mt-2 text-sm text-muted-foreground'>Leader: {group.leader}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
