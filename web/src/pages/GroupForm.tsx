import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { mockGroups } from '../utils/mock-data';
import { GroupGrade } from '../types';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';

export function GroupForm() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!groupId;
  const existingGroup = isEditMode ? mockGroups.find(g => g.id === groupId) : null;

  const [formData, setFormData] = useState({
    name: existingGroup?.name || '',
    label: existingGroup?.label || '',
    type: existingGroup?.type || 'job' as 'gang' | 'job' | 'organization',
    description: existingGroup?.description || '',
  });

  const [grades, setGrades] = useState<GroupGrade[]>(
    existingGroup?.grades || [
      { label: 'Grade 0', accountRole: 'none' as const },
    ]
  );

  const handleAddGrade = () => {
    const newGrade: GroupGrade = {
      label: `Grade ${grades.length}`,
      accountRole: 'none',
    };
    setGrades([...grades, newGrade]);
  };

  const handleRemoveGrade = (index: number) => {
    if (grades.length <= 1) return; // Keep at least one grade
    const updatedGrades = grades.filter((_, i) => i !== index);
    setGrades(updatedGrades);
  };

  const handleGradeChange = (index: number, field: 'label' | 'accountRole', value: string) => {
    setGrades(grades.map((g, i) => 
      i === index ? { ...g, [field]: value } : g
    ));
  };

  const handleMoveGrade = (index: number, direction: 'up' | 'down') => {
    const newGrades = [...grades];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= grades.length) return;
    
    [newGrades[index], newGrades[targetIndex]] = [newGrades[targetIndex], newGrades[index]];
    setGrades(newGrades);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting group:', {
      ...formData,
      grades,
    });

    navigate('/groups');
  };

  return (
    <div className="space-y-6">
      <div className='flex items-center justify-between border-b pb-4 mb-6'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size="icon" onClick={() => navigate('/groups')}>
            <ArrowLeft className='size-4' />
          </Button>

          <div>
            <h1 className='text-2xl font-bold leading-none mb-1'>
              {isEditMode ? 'Edit Group' : 'Create New Group'}
            </h1>
            <p className='text-sm text-muted-foreground'>
              {isEditMode 
                ? `Updating ${isEditMode ? formData.name : 'group'} information` 
                : 'Add a new group, job, or gang to the server'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <Badge variant="outline" className="ml-2 uppercase tracking-widest text-[10px]">
            ID: {groupId}
          </Badge>
        )}
      </div>

      <ScrollArea className='h-[65vh]'>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                General group details and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., police"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isEditMode}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    {isEditMode
                      ? 'Internal identifier can not be changed when editing'
                      : 'Internal identifier for the group'
                    }
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="label">Label *</Label>
                  <Input
                    id="label"
                    placeholder="e.g., Los Santos Police Department"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Display name for the group
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'gang' | 'job' | 'organization') =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="job">Job</SelectItem>
                    <SelectItem value="gang">Gang</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the group"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Grades */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Grades</CardTitle>
                  <CardDescription>
                    Define rank hierarchy and permissions (ordered from lowest to highest)
                  </CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleAddGrade}>
                  <Plus className="mr-2 size-4" />
                  Add Grade
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Level</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Account Role</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <GripVertical className="size-4 text-muted-foreground" />
                          <span>{index}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={grade.label}
                          onChange={(e) => handleGradeChange(index, 'label', e.target.value)}
                          placeholder="Grade label"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={grade.accountRole}
                          onValueChange={(value) => handleGradeChange(index, 'accountRole', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                            <SelectItem value="contributor">Contributor</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="owner">Owner</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoveGrade(index, 'up')}
                            disabled={index === 0}
                          >
                            <ChevronUp className="size-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoveGrade(index, 'down')}
                            disabled={index === grades.length - 1}
                          >
                            <ChevronDown className="size-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveGrade(index)}
                            disabled={grades.length <= 1}
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {grades.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  No grades defined. Add at least one grade.
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1 sm:flex-initial">
              {isEditMode ? 'Update Group' : 'Create Group'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/groups')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
}
