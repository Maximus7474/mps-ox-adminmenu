import { type PlayerShortInfo } from "@common/types/players";

const list: PlayerShortInfo[] = [];

const groups = ['Police', 'Ambulance', 'Gang', 'Staff', undefined];
for (let i = 1; i <= 25; i++) {
  list.push({
    source: `${i}`,
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

export const debugPlayerList: PlayerShortInfo[] = list;
