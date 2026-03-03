import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Ban, AlertTriangle, FileText, UserX, Shield, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { Input } from '../../components/ui/input';
import { mockPlayers } from '../../utils/mock-data';
import { Ban as BanType, Player } from '../../types';
import { ScrollArea } from '../../components/ui/scroll-area';

export function PlayerDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(mockPlayers.find((p) => `${p.id}` === userId) || null);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isSanctionDialogOpen, setIsSanctionDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [banForm, setBanForm] = useState({
    reason: '',
    isPermanent: true,
    duration: '7',
  });
  const [sanctionForm, setSanctionForm] = useState({
    type: 'warning' as 'warning' | 'kick' | 'temp_ban',
    reason: '',
  });
  const [noteText, setNoteText] = useState('');

  if (!player) {
    return (
      <div className='space-y-6'>
        <Button variant='outline' onClick={() => navigate('/players')}>
          <ArrowLeft className='mr-2 size-4' />
          Back to Players
        </Button>
        <Card>
          <CardContent className='py-12 text-center'>
            <p className='text-muted-foreground'>Player not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBanPlayer = () => {
    const newBan = {
      id: `b${Date.now()}`,
      userId: player.id,
      reason: banForm.reason,
      bannedBy: 'CurrentAdmin',
      bannedAt: new Date(),
      expiresAt: banForm.isPermanent
        ? undefined
        : new Date(Date.now() + parseInt(banForm.duration) * 24 * 60 * 60 * 1000),
      isPermanent: banForm.isPermanent,
      revoked: false,
    } satisfies BanType;

    setPlayer({ ...player, bans: [...player.bans, newBan] });
    setIsBanDialogOpen(false);
    setBanForm({ reason: '', isPermanent: true, duration: '7' });
  };

  const handleAddSanction = () => {
    const newSanction = {
      id: `s${Date.now()}`,
      userId: player.id,
      type: sanctionForm.type,
      reason: sanctionForm.reason,
      issuedBy: 'CurrentAdmin',
      issuedAt: new Date(),
    };

    setPlayer({ ...player, sanctions: [...player.sanctions, newSanction] });
    setIsSanctionDialogOpen(false);
    setSanctionForm({ type: 'warning', reason: '' });
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    const newNote = {
      id: `n${Date.now()}`,
      userId: player.id,
      author: 'CurrentAdmin',
      content: noteText,
      createdAt: new Date(),
    };

    setPlayer({ ...player, notes: [...player.notes, newNote] });
    setIsNoteDialogOpen(false);
    setNoteText('');
  };

  const handleToggleCharacter = (charId: number) => {
    const updatedChars = player.characters.map((char) =>
      char.id === charId ? { ...char, disabled: !char.disabled } : char,
    );
    setPlayer({ ...player, characters: updatedChars });
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-start gap-6'>
        <Button variant='outline' onClick={() => navigate('/players')}>
          <ArrowLeft className='size-4' />
        </Button>

        <div className='flex items-center gap-2'>
          <h1 className='mb-0'>{player.name}</h1>
          {player.isStaff && (
            <Badge variant='secondary'>
              <Shield className='mr-1 size-3' />
              Staff
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue='overview' className='w-full flex flex-col'>
        <TabsList className='mb-2 w-full grid grid-cols-4'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='characters'>Characters</TabsTrigger>
          <TabsTrigger value='sanctions'>Sanctions</TabsTrigger>
          <TabsTrigger value='notes'>Notes</TabsTrigger>
        </TabsList>

        <ScrollArea className='h-[63vh] pr-3'>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 lg:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Player Information</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Steam ID:</span>
                    <span>{player.steamId}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Discord ID:</span>
                    <span>{player.discordId || 'N/A'}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>License:</span>
                    <span className='break-all text-xs'>{player.licenseId}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>First Joined:</span>
                    <span>{player.firstJoined.toLocaleDateString()}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Last Seen:</span>
                    <span>{player.lastSeen.toLocaleDateString()}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Status:</span>
                    <div className='flex items-center gap-2'>
                      <div className={`size-2 rounded-full ${player.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                      <span>{player.isOnline ? 'Online' : 'Offline'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Button className='w-full' variant='destructive' onClick={() => setIsBanDialogOpen(true)}>
                    <Ban className='mr-2 size-4' />
                    Ban Player
                  </Button>
                  <Button className='w-full' variant='outline' onClick={() => setIsSanctionDialogOpen(true)}>
                    <AlertTriangle className='mr-2 size-4' />
                    Add Sanction
                  </Button>
                  <Button className='w-full' variant='outline' onClick={() => setIsNoteDialogOpen(true)}>
                    <FileText className='mr-2 size-4' />
                    Add Note
                  </Button>
                </CardContent>
              </Card>
            </div>

            {player.bans.filter((b) => !b.revoked).length > 0 && (
              <Card className='border-destructive'>
                <CardHeader>
                  <CardTitle className='text-destructive'>Active Bans</CardTitle>
                </CardHeader>
                <CardContent>
                  {player.bans
                    .filter((b) => !b.revoked)
                    .map((ban) => (
                      <div key={ban.id} className='space-y-1 border-b pb-3 last:border-b-0'>
                        <div className='flex items-center justify-between'>
                          <span>{ban.isPermanent ? 'Permanent Ban' : 'Temporary Ban'}</span>
                          <Badge variant='destructive'>Active</Badge>
                        </div>
                        <p className='text-sm'>{ban.reason}</p>
                        <p className='text-sm text-muted-foreground'>
                          By {ban.bannedBy} on {ban.bannedAt.toLocaleDateString()}
                        </p>
                        {ban.expiresAt && (
                          <p className='text-sm text-muted-foreground'>Expires: {ban.expiresAt.toLocaleDateString()}</p>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value='characters' className='space-y-4'>
            <div className='grid gap-4'>
              {player.characters.map((char) => (
                <Card key={char.id} className={char.disabled ? 'opacity-80' : ''}>
                  <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                      <CardTitle>{char.name}</CardTitle>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                          <Label htmlFor={`char-${char.id}`} className='text-xs cursor-pointer'>
                            Disabled
                          </Label>
                          <Switch
                            id={`char-${char.id}`}
                            checked={char.disabled}
                            onCheckedChange={() => handleToggleCharacter(char.id)}
                          />
                        </div>
                        {char.disabled && (
                          <Badge variant='destructive'>
                            <UserX className='mr-1 size-3' />
                            Disabled
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription className='font-mono text-xs'>{char.stateId}</CardDescription>
                  </CardHeader>

                  <CardContent className='grid gap-6 text-sm'>
                    <div className='space-y-3'>
                      <div className='flex items-center gap-2 border-b pb-2'>
                        <Shield className='size-4 text-muted-foreground' />
                        <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                          Group Affiliations
                        </span>
                      </div>

                      <div className='grid gap-2 sm:grid-cols-2'>
                        {char.groups.length > 0 ? (
                          char.groups.map((group) => (
                            <div
                              key={group.name}
                              className='flex justify-between items-center bg-muted/30 p-2 rounded-md border border-dashed'
                            >
                              <span className='text-xs text-muted-foreground capitalize font-medium'>{group.type}</span>
                              <Badge
                                variant={group.type === 'job' ? 'outline' : 'destructive'}
                                className='ml-2 font-semibold'
                              >
                                {group.label}
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <div className='py-2 text-muted-foreground italic'>No active group memberships</div>
                        )}
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <div className='flex items-center gap-2 border-b pb-2'>
                        <Activity className='size-4 text-muted-foreground' />
                        <span className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                          Financials & Activity
                        </span>
                      </div>

                      <div className='grid gap-2 sm:grid-cols-2'>
                        <div className='flex justify-between'>
                          <span className='text-muted-foreground'>Cash Balance:</span>
                          <span className='font-mono font-bold text-green-600 dark:text-green-400'>
                            ${char.money.toLocaleString()}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-muted-foreground'>Bank Balance:</span>
                          <span className='font-mono font-bold text-blue-600 dark:text-blue-400'>
                            ${char.bankMoney.toLocaleString()}
                          </span>
                        </div>
                        <div className='flex justify-between sm:col-span-2 mt-1 text-xs text-muted-foreground italic'>
                          <span>Last session: {char.lastPlayed.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value='sanctions' className='space-y-4'>
            <Button onClick={() => setIsSanctionDialogOpen(true)} className='w-full'>
              <AlertTriangle className='mr-2 size-4' />
              Add Sanction
            </Button>
            <div className='space-y-3'>
              {player.sanctions.length === 0 ? (
                <Card>
                  <CardContent className='py-12 text-center text-muted-foreground'>No sanctions on record</CardContent>
                </Card>
              ) : (
                player.sanctions.map((sanction) => (
                  <Card key={sanction.id}>
                    <CardContent className='pt-6'>
                      <div className='flex items-start justify-between'>
                        <div className='space-y-1'>
                          <div className='flex items-center gap-2'>
                            <Badge
                              variant={
                                sanction.type === 'warning'
                                  ? 'secondary'
                                  : sanction.type === 'kick'
                                    ? 'outline'
                                    : 'destructive'
                              }
                            >
                              {sanction.type.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          <p className='text-sm'>{sanction.reason}</p>
                          <p className='text-sm text-muted-foreground'>
                            By {sanction.issuedBy} on {sanction.issuedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value='notes' className='space-y-4'>
            <Button onClick={() => setIsNoteDialogOpen(true)} className='w-full'>
              <FileText className='mr-2 size-4' />
              Add Note
            </Button>
            <div className='space-y-3'>
              {player.notes.length === 0 ? (
                <Card>
                  <CardContent className='py-12 text-center text-muted-foreground'>No notes on record</CardContent>
                </Card>
              ) : (
                player.notes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className='pt-6'>
                      <div className='space-y-2'>
                        <p className='text-sm'>{note.content}</p>
                        <p className='text-sm text-muted-foreground'>
                          By {note.author} on {note.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Ban Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban Player</DialogTitle>
            <DialogDescription>Issue a ban for {player.name}</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='ban-reason'>Reason</Label>
              <Textarea
                id='ban-reason'
                placeholder='Reason for ban...'
                value={banForm.reason}
                onChange={(e) => setBanForm({ ...banForm, reason: e.target.value })}
              />
            </div>
            <div className='flex items-center gap-2'>
              <Switch
                id='ban-permanent'
                checked={banForm.isPermanent}
                onCheckedChange={(checked) => setBanForm({ ...banForm, isPermanent: checked })}
              />
              <Label htmlFor='ban-permanent'>Permanent Ban</Label>
            </div>
            {!banForm.isPermanent && (
              <div className='grid gap-2'>
                <Label htmlFor='ban-duration'>Duration (days)</Label>
                <Input
                  id='ban-duration'
                  type='number'
                  value={banForm.duration}
                  onChange={(e) => setBanForm({ ...banForm, duration: e.target.value })}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleBanPlayer}>
              Ban Player
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sanction Dialog */}
      <Dialog open={isSanctionDialogOpen} onOpenChange={setIsSanctionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Sanction</DialogTitle>
            <DialogDescription>Issue a sanction for {player.name}</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='sanction-type'>Type</Label>
              <Select
                value={sanctionForm.type}
                onValueChange={(value: 'warning' | 'kick' | 'temp_ban') =>
                  setSanctionForm({ ...sanctionForm, type: value })
                }
              >
                <SelectTrigger id='sanction-type'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='warning'>Warning</SelectItem>
                  <SelectItem value='kick'>Kick</SelectItem>
                  <SelectItem value='temp_ban'>Temporary Ban</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='sanction-reason'>Reason</Label>
              <Textarea
                id='sanction-reason'
                placeholder='Reason for sanction...'
                value={sanctionForm.reason}
                onChange={(e) => setSanctionForm({ ...sanctionForm, reason: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsSanctionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSanction}>Add Sanction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Note Dialog */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>Add a note for {player.name}</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='note-content'>Note</Label>
              <Textarea
                id='note-content'
                placeholder='Enter note...'
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Add Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
