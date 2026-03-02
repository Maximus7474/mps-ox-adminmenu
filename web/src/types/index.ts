export interface Character {
  id: string;
  name: string;
  playerId: string;
  identifier: string;
  job: string;
  gang?: string;
  money: number;
  bankMoney: number;
  lastPlayed: Date;
  disabled: boolean;
}

export interface Player {
  id: string;
  name: string;
  steamId: string;
  discordId?: string;
  licenseId: string;
  characters: Character[];
  isOnline: boolean;
  isStaff: boolean;
  notes: PlayerNote[];
  bans: Ban[];
  sanctions: Sanction[];
  firstJoined: Date;
  lastSeen: Date;
}

export interface Group {
  id: string;
  name: string;
  type: 'gang' | 'job' | 'organization';
  label: string;
  description: string;
  memberCount: number;
  leader?: string;
  members: GroupMember[];
  grades: GroupGrade[];
  createdAt: Date;
}

export interface GroupGrade {
  label: string;
  accountRole: 'none' | 'viewer' | 'contributor' | 'manager' | 'owner';
}

export interface GroupMember {
  characterId: string;
  characterName: string;
  playerId: string;
  playerName: string;
  rank: string;
  joinedAt: Date;
}

export interface PlayerNote {
  id: string;
  playerId: string;
  author: string;
  content: string;
  createdAt: Date;
}

export interface Ban {
  id: string;
  playerId: string;
  reason: string;
  bannedBy: string;
  bannedAt: Date;
  expiresAt?: Date;
  isPermanent: boolean;
  isActive: boolean;
}

export interface Sanction {
  id: string;
  playerId: string;
  type: 'warning' | 'kick' | 'temp_ban';
  reason: string;
  issuedBy: string;
  issuedAt: Date;
}
