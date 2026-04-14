import { Activity, Shield, X } from 'lucide-react';
import { Character } from '../../../types';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';

export default function CharacterCard({
  character,
  toggleDisabled,
}: { character: Character; toggleDisabled: (charId: number) => void }) {
  return (
    <div className='grid gap-4'>
      <Card key={character.id} className={character.disabled ? 'opacity-80' : ''}>
        <CardHeader className='pb-3'>
          <div className='flex items-center justify-between'>
            <CardTitle>{character.name}</CardTitle>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Label htmlFor={`character-${character.id}`} className='text-xs cursor-pointer'>
                  Disabled
                </Label>
                <Switch
                  id={`character-${character.id}`}
                  checked={character.disabled}
                  onCheckedChange={() => toggleDisabled(character.id)}
                />
                {character.disabled ? <X color='red' /> : <Activity color='green' />}
              </div>
            </div>
          </div>
          <CardDescription className='font-mono text-xs'>{character.stateId}</CardDescription>
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
              {character.groups.length > 0 ? (
                character.groups.map((group) => (
                  <div
                    key={group.name}
                    className='flex justify-between items-center bg-muted/30 p-2 rounded-md border border-dashed'
                  >
                    <span className='text-xs text-muted-foreground capitalize font-medium'>{group.type}</span>
                    <Badge variant={group.type === 'job' ? 'outline' : 'destructive'} className='ml-2 font-semibold'>
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
                  ${character.money.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Bank Balance:</span>
                <span className='font-mono font-bold text-blue-600 dark:text-blue-400'>
                  ${character.bankMoney.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between sm:col-span-2 mt-1 text-xs text-muted-foreground italic'>
                <span>Last session: {character.lastPlayed.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
