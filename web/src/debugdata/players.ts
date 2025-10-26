import { PlayerRecap, type OnlinePlayerShortInfo } from "@common/types/players";

const list: OnlinePlayerShortInfo[] = [];

const groups = ['Police', 'Ambulance', 'Gang', 'Staff', undefined];
for (let i = 1; i <= 25; i++) {
  list.push({
    source: i,
    userid: i + 2,
    name: `Player ${i}`,
    character: {
      firstname: 'Firstname',
      lastname: 'Lastname',
      id: `${i}`,
      stateid: window.crypto.randomUUID().split('-', 1)[0],
      activegroup: groups[ i % groups.length ],
    },
  })
}

export const debugPlayerList: OnlinePlayerShortInfo[] = list;

export const debugPlayerRecap: PlayerRecap = {
  userId: 74,
  username: "Maximus Prime",
  license2: "abcdef0123456789abcdef0123456789",
  steam: "steam:110000101234567",
  fivem: "fivem:123456",
  discord: "110000101234567",
  banned: {
    reason: "Admin abuse ban.",
    banned_at: 1678886400,
    unban_at: 1710422400,
  },
  characters: [
    {
      charId: 1,
      stateId: "CA2345",
      firstName: "James",
      lastName: "Bond",
      gender: "male",
      lastPlayed: 1700000000,
      isDead: 0,
      deleted: 0,
    },
    {
      charId: 2,
      stateId: "NY7890",
      firstName: "Eliza",
      lastName: "Thorne",
      gender: "female",
      lastPlayed: 1705000000,
      isDead: 0,
      deleted: 0,
    },
    {
      charId: 3,
      stateId: "TX4321",
      firstName: "Marcus",
      lastName: "Redfield",
      gender: "male",
      lastPlayed: 1650000000,
      isDead: 1,
      deleted: 0,
    },
    {
      charId: 4,
      stateId: "FL0001",
      firstName: "Dummy",
      lastName: "Char",
      gender: "male",
      lastPlayed: 1600000000,
      isDead: 0,
      deleted: 1,
    },
  ],
};
