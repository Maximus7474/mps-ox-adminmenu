import type { BasePlayer } from '@common/types';
import { GetPlayer } from '@communityox/ox_core/server';

class PlayerWatcher {
  private onlinePlayers: BasePlayer[] = [];

  constructor() {}

  async addPlayer(source: string) {
    if (this.onlinePlayers.some((p) => p.source === source)) return;

    const oxplayer = GetPlayer(source)!;

    const isStaff = false;

    const playerPayload = {
      source,
      userId: oxplayer.userId,
      username: oxplayer.username,
      isStaff,
    } satisfies BasePlayer;

    this.onlinePlayers.push(playerPayload);
  }

  removePlayer(source: string) {
    const index = this.onlinePlayers.findIndex((p) => p.source === source);

    if (index !== -1) {
      this.onlinePlayers.splice(index, 1);
    }
  }
}

export const watcher = new PlayerWatcher();

on('playerJoining', () => {
  const src = source.toString();

  // guarantee that ox_core has loaded the player
  setTimeout(() => {
    watcher.addPlayer(src);
  }, 500);
});

on('playerDropped', () => {
  const src = source.toString();
  watcher.removePlayer(src);
});
