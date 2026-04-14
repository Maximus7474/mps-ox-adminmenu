import { onClientCallback } from '@communityox/ox_lib/server';
import { GetPlayer, type OxPlayer } from '@communityox/ox_core/server';

export const registerAuthorisedCallback = (event: string, cb: (player: OxPlayer, ...args: any[]) => any) => {
  onClientCallback(event, async (playerId, ...args) => {
    const player = GetPlayer(playerId);

    if (!player || !player.hasPermission('group.staff.usepanel')) return false;

    const response = await cb(player, ...args);

    return response ?? {};
  });
};
