export type OxAccountRole = 'viewer' | 'contributor' | 'manager' | 'owner';

export interface OxGroup {
  name: string;
  label: string;
  grades: {
    label: string;
    accountRole?: OxAccountRole;
  }[];
  type?: string;
  colour?: number;
  hasAccount: boolean;
}
