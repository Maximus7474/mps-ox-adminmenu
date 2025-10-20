export interface PlayerShortInfo {
  source: string;
  name: string;
  character: {
    firstname: string;
    lastname: string;
    id: string;
    stateid: string;
    activegroup?: string;
  };
}
