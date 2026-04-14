import { BanIcon, Gavel, History } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Ban } from '@common/types';

export default function BanSection({ bans }: { bans: Ban[] }) {
  const now = new Date();

  const activeBans = bans.filter((b) => !b.revoked && (b.isPermanent || (b.expiresAt && b.expiresAt > now)));

  const expiredBans = bans.filter((b) => !b.revoked && !b.isPermanent && b.expiresAt && b.expiresAt <= now);

  const revokedBans = bans.filter((b) => b.revoked);

  const BanList = ({
    bans,
    statusLabel,
    badgeVariant,
    showBadge,
  }: {
    bans: Ban[];
    statusLabel: string;
    badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline' | undefined;
    showBadge: (ban: Ban) => boolean;
  }) => (
    <div className='space-y-4'>
      {bans.map((ban) => (
        <div key={ban.id} className='space-y-1 border-b pb-3 last:border-b-0'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold'>{ban.isPermanent ? 'Permanent Ban' : 'Temporary Ban'}</span>
            {showBadge(ban) && <Badge variant={badgeVariant}>{statusLabel}</Badge>}
          </div>
          <p className='text-sm'>{ban.reason}</p>
          <p className='text-xs text-muted-foreground'>
            Issued by <span className='font-medium text-foreground'>{ban.bannedBy}</span> on{' '}
            {ban.bannedAt.toLocaleDateString()}
          </p>
          {ban.expiresAt && !ban.isPermanent && (
            <p className='text-xs text-muted-foreground italic'>
              {ban.revoked ? 'Would have expired' : 'Expires'}: {ban.expiresAt.toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className='space-y-4 border-t pt-4'>
      {activeBans.length > 0 && (
        <Card className='border-destructive bg-destructive/5'>
          <CardHeader>
            <CardTitle className='text-destructive flex items-center gap-2 text-lg'>
              <Gavel className='size-5' /> Active Bans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BanList
              bans={activeBans}
              statusLabel='Active'
              badgeVariant='destructive'
              showBadge={(ban) => {
                console.log(
                  'show badge ?',
                  ban.id,
                  ban.isPermanent,
                  ban.expiresAt,
                  '=>',
                  ban.isPermanent,
                  '||',
                  ban.expiresAt! > now,
                );
                return ban.isPermanent || ban.expiresAt! > now;
              }}
            />
          </CardContent>
        </Card>
      )}

      {expiredBans.length > 0 && (
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-amber-600 flex items-center gap-2 text-lg dark:text-amber-500'>
              <History className='size-5' /> Expired Bans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BanList bans={expiredBans} statusLabel='Expired' badgeVariant='outline' showBadge={() => false} />
          </CardContent>
        </Card>
      )}

      {revokedBans.length > 0 && (
        <Card className='opacity-75'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-muted-foreground flex items-center gap-2 text-lg'>
              <BanIcon className='size-5 line-through' /> Revoked / Pardoned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BanList
              bans={revokedBans}
              statusLabel='Permanent Ban'
              badgeVariant='destructive'
              showBadge={(ban) => ban.isPermanent}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
