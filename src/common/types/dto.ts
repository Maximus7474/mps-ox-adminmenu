export interface Character {
  id: number;
  name: string;
  stateId: string;
  activeGroup?: string;
  groups: CharacterGroup[];
  money: number;
  bankMoney: number;
  lastPlayed: Date;
  disabled: boolean;
}

export interface CharacterGroup {
  name: string;
  label: string;
  type: string;
}

export interface Player {
  id: number;
  name: string;
  steamId: string;
  discordId?: string;
  licenseId: string;
  activeCharacter?: number;
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
  bankAccount?: number;
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
  userId: number;
  playerName: string;
  rank: string;
  joinedAt: Date;
}

export interface PlayerNote {
  id: string;
  userId: number;
  author: string;
  content: string;
  createdAt: Date;
}

export interface Ban {
  id: string;
  userId: number;
  reason: string;
  bannedBy: string;
  bannedAt: Date;
  expiresAt?: Date;
  isPermanent: boolean;
  revoked: boolean;
}

export interface Sanction {
  id: string;
  userId: number;
  type: 'warning' | 'kick' | 'temp_ban';
  reason: string;
  issuedBy: string;
  issuedAt: Date;
}
