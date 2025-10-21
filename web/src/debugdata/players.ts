import { type OnlinePlayerShortInfo } from "@common/types/players";

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
