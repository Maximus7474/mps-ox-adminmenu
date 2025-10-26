export interface PlayerShortInfo {
  userid: number;
  name: string;
  character: {
    firstname: string;
    lastname: string;
    id: string;
    stateid: string;
    activegroup?: string;
  };
}

export interface OnlinePlayerShortInfo extends PlayerShortInfo {
  source: number;
}

export interface PlayerInfo {
  userId: number;
  username: string;
  license2: string;
  steam: string|null;
  fivem: string|null;
  discord: string|null;
  banned?: {
    reason: string;
    banned_at: number;
    unban_at: number | null;
  }
}

export interface PlayerCharacterShort {
  charId: number;
  stateId: string;
  firstName: string;
  lastName: string;
  gender: string;
  lastPlayed: number;
  isDead: 0 | 1;
  deleted: 0 | 1;
}

export interface PlayerRecap extends PlayerInfo {
  characters: PlayerCharacterShort[];
}
