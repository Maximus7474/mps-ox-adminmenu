export type OxAccountRole = 'viewer' | 'contributor' | 'manager' | 'owner';

export interface OxGroup extends OxGroupShort {
  grades: {
    label: string;
    accountRole?: OxAccountRole;
  }[];
}

export interface OxGroupShort {
  name: string;
  label: string;
  type?: string;
  colour?: number;
  hasAccount?: boolean;
};
