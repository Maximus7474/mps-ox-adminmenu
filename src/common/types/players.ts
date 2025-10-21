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
