import { triggerServerCallback } from '@communityox/ox_lib/client';

const serverNuiCallback = <T = any>(event: string, clientCb?: (data: T, cb: (data: T) => void) => void) => {
  RegisterNuiCallback(event, async function (data: T, cb: (data: T) => void) {
    const response = (await triggerServerCallback<Promise<unknown>>(`adminox:${event}`, null, data)) as T;

    if (clientCb) {
      clientCb(response, cb);
    } else {
      cb(response);
    }
  });
};
